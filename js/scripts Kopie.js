
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

    //Logs pokémon details in the Modal when button is clicked
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon);
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
          item.types = details.types.map((type) => type.type.name).join(', ');

        }).catch(function (e) {
          console.error(e);
        });
    }


    function showModal(pokemon) {
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content everytime it's clicked
        modalContainer.innerHTML = ''; 

    
        let modal = document.createElement('div');
        modal.classList.add('modal')

        
    // Add Event Listener to the close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
  
    // Add the title Element
        let titleElement = document.createElement('h1');
        titleElement.classList.add('modal-title');
        titleElement.innerText = pokemon.name;
    
    // Add the pokemon height
        let pokemonHeight = document.createElement('p');
        pokemonHeight.classList.add('pokemon-height');
        pokemonHeight.innerText = ("Height: " + (pokemon.height/10) + " m");
        
    // Add the pokemon type
        let pokemonTypes = document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        pokemonTypes.innerText = ("Types: " +pokemon.types);

    // Add the pokemon image 
        let pokemonImage = document.createElement("img");
        pokemonImage.classList.add('pokemon-img')
        pokemonImage.setAttribute("src", pokemon.imageUrl);
        pokemonImage.setAttribute("width", "304");
        pokemonImage.setAttribute("height", "228");
        pokemonImage.setAttribute("alt", "The Pokemon Image");
        
        
        //modalBody.append(types);
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonTypes);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }
    
    
    //Removes visibility class from modal
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();
        }
    });
    
    let modalContainer = document.querySelector('#modal-container'); 

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal container,
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });
  
    return {
      add: add,
      getAll: getAll,
      filterPokemonByName: filterPokemonByName,
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

