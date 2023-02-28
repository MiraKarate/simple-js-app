
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasur', height: 0.7, weight: 6.9, types: ['grass', 'poison']},
        {name: 'Seadra', height: 1.2, weight: 25, types: ['water']},
        {name: 'Pikachu', height: 0.4, weight: 6, types: ['electirc']},
        {name: 'Nidoking', height: 1.4, weight: 62, types: ['ground', 'poison']},
        ];

    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();

// internale anonymous function to loop through the list of pokemon
pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' (height:' + pokemon.height + ', weight:' + pokemon.weight + ', types:' + pokemon.types + ')<br>');
});
  