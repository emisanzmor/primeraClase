function cargarPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokemon) {
            mostrarPokemon(pokemon);
        });
}

function mostrarPokemon(pokemon) {
    const resultado = document.getElementById('pokemon-resultado');
    
    resultado.innerHTML = 
        '<img src="' + pokemon.sprites.front_default + '" alt="' + pokemon.name + '" class="pokemon-imagen">' +
        '<h2 class="pokemon-nombre">' + pokemon.name.toUpperCase() + '</h2>';
}

cargarPokemon();