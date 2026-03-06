// aqui guardo todos los pokemon que traigo de la api
var todosLosPokemon = [];

// funcion para cargar los pokemon
function cargarTodosLosPokemon() {
    var urlLista = 'https://pokeapi.co/api/v2/pokemon?limit=50';

    fetch(urlLista)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // data.results tiene la lista de pokemon
            var listaPokemon = data.results;
            
            // por cada pokemon pido sus detalles
            listaPokemon.forEach(function(pokemon) {
                cargarDetallePokemon(pokemon.url);
            });
        });
}

function cargarDetallePokemon(url) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokemon) {
            todosLosPokemon.push(pokemon);
            mostrarPokemon(todosLosPokemon);
        });
}

// mostrar los pokemon en el html
function mostrarPokemon(listaPokemon) {
    var contenedor = document.getElementById('pokemon-contenedor');
    contenedor.innerHTML = '';
    
    // ordeno por id
    listaPokemon.sort(function(a, b) {
        return a.id - b.id;
    });
    
    listaPokemon.forEach(function(pokemon) {
        var tarjeta = crearTarjeta(pokemon);
        contenedor.innerHTML = contenedor.innerHTML + tarjeta;
    });
}

function crearTarjeta(pokemon) {
    var tipoPrincipal = pokemon.types[0].type.name;
    
    // saco los tipos y los junto con coma
    var tipos = pokemon.types.map(function(t) {
        return t.type.name;
    }).join(', ');
    
    var tarjetaHTML = 
        '<div class="pokemon-tarjeta" data-tipo="' + tipoPrincipal + '">' +
            '<img src="' + pokemon.sprites.front_default + '" alt="' + pokemon.name + '">' +
            '<h3>' + pokemon.name.toUpperCase() + '</h3>' +
            '<p class="pokemon-id">#' + pokemon.id + '</p>' +
            '<p class="pokemon-tipo">Tipo: ' + tipos + '</p>' +
            '<p class="pokemon-stats">Altura: ' + (pokemon.height / 10) + 'm</p>' +
            '<p class="pokemon-stats">Peso: ' + (pokemon.weight / 10) + 'kg</p>' +
        '</div>';
    
    return tarjetaHTML;
}

// filtrar pokemon por nombre, id o tipo
function filtrarPokemon() {
    var filtroNombre = document.getElementById('filtro-nombre').value.toLowerCase();
    var filtroId = document.getElementById('filtro-id').value;
    var filtroTipo = document.getElementById('filtro-tipo').value.toLowerCase();
    
    var pokemonFiltrados = todosLosPokemon.filter(function(pokemon) {
        // reviso si el nombre coincide
        var cumpleNombre = pokemon.name.toLowerCase().includes(filtroNombre);
        
        // reviso el id
        var cumpleId = true;
        if (filtroId !== '') {
            cumpleId = pokemon.id === parseInt(filtroId);
        }
        
        // reviso el tipo
        var cumpleTipo = true;
        if (filtroTipo !== '') {
            cumpleTipo = pokemon.types.some(function(t) {
                return t.type.name.toLowerCase().includes(filtroTipo);
            });
        }
        
        // tiene que cumplir los 3
        return cumpleNombre && cumpleId && cumpleTipo;
    });
    
    mostrarPokemon(pokemonFiltrados);
}

function limpiarFiltros() {
    document.getElementById('filtro-nombre').value = '';
    document.getElementById('filtro-id').value = '';
    document.getElementById('filtro-tipo').value = '';
    
    mostrarPokemon(todosLosPokemon);
}

// inicio la carga
cargarTodosLosPokemon();
