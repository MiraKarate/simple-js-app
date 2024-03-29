
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 
        'name' in pokemon 
        ) {
            pokemonList.push(pokemon);
        } else {
            document.write('A pokemon is required.');
        }
    }

    function getAll() {
      return pokemonList;
    }


    function addListItem(pokemon) {
        let pokedexList = document.querySelector('.list-group'); //assign variable the ul element (class list-group)
        let listItem = document.createElement('li'); // Create an li element 
        
        listItem.classList.add('group-list-item'); // BOOTSTRAP added new class to li

        let button = document.createElement('button'); // Create a button element
        button.innerText = pokemon.name; // set buttons innerText to be the Pokémon's name
        button.classList.add('pokemon-name-button'); // Adds a class to the button using the classList.add method for css
        
        button.classList.add('btn'); // BOOTSTRAP 
        button.setAttribute('data-toggle', 'modal'); // BOOTSTRAP 
        button.setAttribute('data-target', '#pokemonModal'); // BOOTSTRAP 
        
        listItem.appendChild(button); // append the button to the list item as its child
        pokedexList.appendChild(listItem); // append the list item to the unordered list as its child
        
        button.addEventListener('click', function(){
        showDetails(pokemon); 
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
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types.map((type) => type.type.name).join(', ');

        }).catch(function (e) {
          console.error(e);
        });
    }

     //Logs pokémon details in the Modal when button is clicked
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    }

    //MODAL STARTS
    function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      // Clear all existing modal content everytime it's clicked
      modalTitle.empty();
      modalBody.empty(); 


  // Add the title Element
      let pokemonName = document.createElement('h1');
      pokemonName.classList.add('modal-title');
      pokemonName.innerText = pokemon.name;

  // Add the pokemon height
      let pokemonHeight = document.createElement('p');
      pokemonHeight.classList.add('pokemon-height');
      pokemonHeight.innerText = ('Height: ' + (pokemon.height/10) + ' m');
      
  // Add the pokemon type
      let pokemonTypes = document.createElement('p');
      pokemonTypes.classList.add('pokemon-types');
      pokemonTypes.innerText = ('Types: ' +pokemon.types);

  // Add the pokemon image 
      let pokemonImage = document.createElement('img');
      pokemonImage.classList.add('pokemon-img')
      pokemonImage.setAttribute('src', pokemon.imageUrl);
      pokemonImage.setAttribute('width', '304');
      pokemonImage.setAttribute('height', '228');
      pokemonImage.setAttribute('alt', 'The Pokemon Image');
      
      
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


    //Matches search input to pokemon name and hides buttons not matching
    function searchPokemon() {
      let searchInput = document.getElementById('search-input');
      let searchText = searchInput.value.toLowerCase();
      let allPokemon = document.querySelectorAll('.group-list-item');

      allPokemon.forEach(function(pokemon) {
        let pokemonText = pokemon.querySelector('.pokemon-name-button').innerText.toLowerCase();

        if (pokemonText.includes(searchText)) {
        let searchList = document.querySelector('.list-group');
        searchList.classList.add('search-list');
        pokemon.style.display = 'inline-block';
        } else {
        pokemon.style.display = 'none';
        }
      });
    }  

    //Triggers search function as input is typed
    let searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
    searchPokemon();
    });

    
    return {
      add: add,
      getAll: getAll,
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

