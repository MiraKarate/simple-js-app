
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === "object" && 
        "name" in pokemon 
        ) {
            pokemonList.push(pokemon);
        } else {
            document.write("A pokemon is required.");
        }
    }

    function getAll() {
      return pokemonList;
    }

    function filterPokemonByName(name) {
        let result = getAll().filter((pokemon) => pokemon.name == name);
        return result[0];   // starting index of 0
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
    }

    function addListItem(pokemon) {
        let pokedexList = document.querySelector('.pokemon-list'); //assign variable the ul element (class pokemon-list)
        let listItem = document.createElement('li'); // Create an li element 
        let button = document.createElement('button'); // Create a button element
        button.innerText = pokemon.name; // set buttons innerText to be the Pokémon's name
        button.classList.add('pokemon-name-button'); // Adds a class to the button using the classList.add method
        listItem.appendChild(button); // append the button to the list item as its child
        pokedexList.appendChild(listItem); // append the list item to the unordered list as its child
        button.addEventListener('click', function(){
        showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json(); // This returns a promise!
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e); // Error
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }


    return {
      add: add,
      getAll: getAll,
      filterPokemonByName: filterPokemonByName,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});
  
