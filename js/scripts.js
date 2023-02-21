let pokemonList = [
    {name: 'Bulbasur', height: 0.7, weight: 6.9, types: ['grass', 'poison']},
    {name: 'Seadra', height: 1.2, weight: 25, types: ['water']},
    {name: 'Pikachu', height: 0.4, weight: 6, types: ['electirc']},
    {name: 'Nidoking', height: 1.4, weight: 62, types: ['ground', 'poison']}
    ];

for(let i = 0; i < pokemonList.length; i++){ 
    if (pokemonList[i].height > 1.3){
        document.write(" " + pokemonList[i].name + " (height:" + pokemonList[i].height + ") -Wow, that’s big!");
    }else{
    document.write(" " + pokemonList[i].name + " (height:" + pokemonList[i].height + "); ");
    }
}

