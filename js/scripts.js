
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasur', 
        height: 0.7, 
        weight: 6.9, 
        types: ['grass', 'poison']
        },
        {name: 'Seadra', 
        height: 1.2, 
        weight: 25, 
        types: ['water']
        },
        {name: 'Pikachu', 
        height: 0.4, 
        weight: 6, 
        types: ['electirc']
        },
        {name: 'Nidoking',
        height: 1.4, 
        weight: 62, 
        types: ['ground', 'poison']
        },
    ];

    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
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
        console.log (pokemon);
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
  
    return {
      add: add,
      getAll: getAll,
      filterPokemonByName: filterPokemonByName,
      addListItem: addListItem,
      showDetails: showDetails
    };
})();

pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
 