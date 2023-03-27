
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


    function addListItem(pokemon) {
        let pokedexList = document.querySelector('.pokemon-list'); //assign variable the ul element (class pokemon-list)
        let listItem = document.createElement('li'); // Create an li element 
        
        listItem.classList.add('list-group-item'); // BOTTSTRAP added new class to li

        let button = document.createElement('button'); // Create a button element
        button.innerText = pokemon.name; // set buttons innerText to be the Pokémon's name
        button.classList.add('pokemon-name-button'); // Adds a class to the button using the classList.add method
        
        button.classList.add('btn'); // BOTTSTRAP 
        button.setAttribute('data-toggle', 'modal'); // BOTTSTRAP 
        button.setAttribute('data-target', '#pokemonModal'); // BOTTSTRAP 
        
        listItem.appendChild(button); // append the button to the list item as its child
        pokedexList.appendChild(listItem); // append the list item to the unordered list as its child
        
        button.addEventListener('click', function(){
        showDetails(pokemon); 
        });
    }

    //Logs pokémon details in the Modal when button is clicked
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    //Fetches pokémon list from API and adds pokémons as objects
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

    //Gets data from detailsURL and returns specific pokémon details
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map((type) => type.type.name).join(', ');

        }).catch(function (e) {
          console.error(e);
        });
    }


    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
      
        // Clear all existing modal content everytime it's clicked
        modalTitle.empty();
        modalBody.empty();
  
        // Add the title Element
        let pokemonName = $("<h1>" + pokemon.name + "</h1>");
    
        // Add the pokemon height
        let pokemonHeight = $("<p>" + "Height: " + (pokemon.height/10) + " m" + "</p>");
      
        // Add the pokemon types
        let pokemonTypes = $("<p>"+ "Types: " + pokemon.types + "</p>");
        
        // Add the pokemon image 
        let pokemonImage = $('<img class="pokemon-img" style="width:50%">');
        pokemonImage.setAttribute("src", pokemon.imageUrl);
      
        
        //modalBody.append(types);
        modalTitle.append(pokemonName);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonTypes);
        modalBody.append(pokemonImage);
    }
    
    
    //Removes visibility class from modal
    function hideModal() {
        let modalContainer = document.querySelector('#pokemonModal');
        modalContainer.classList.remove('is-visible');
    }
    
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#pokemonModal');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
    });
    
    return {
      add: add,
      getAll: getAll,
      //filterPokemonByName: filterPokemonByName,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});

