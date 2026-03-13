var todosLosPokemon = [];

function cargarPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            data.results.forEach(function(p) {
                fetch(p.url)
                    .then(function(res) { return res.json(); })
                    .then(function(pokemon) {
                        todosLosPokemon.push(pokemon);
                        mostrar(todosLosPokemon);
                    });
            });
        });
}

function mostrar(lista) {
    var html = '';
    lista.sort(function(a, b) { return a.id - b.id; });
    
    lista.forEach(function(p) {
        html += '<div class="pokemon-tarjeta">' +
            '<img src="' + p.sprites.front_default + '">' +
            '<h3>' + p.name.toUpperCase() + '</h3>' +
            '<p>#' + p.id + '</p>' +
            '<p>Tipo: ' + p.types[0].type.name + '</p>' +
        '</div>';
    });
    
    document.getElementById('pokemon-contenedor').innerHTML = html;
}

function filtrarPokemon() {
    var nombre = document.getElementById('filtro-nombre').value.toLowerCase();
    var id = document.getElementById('filtro-id').value;
    var tipo = document.getElementById('filtro-tipo').value.toLowerCase();
    
    var filtrados = todosLosPokemon.filter(function(p) {
        var okNombre = p.name.includes(nombre);
        var okId = id === '' || p.id === parseInt(id);
        var okTipo = tipo === '' || p.types.some(function(t) {
            return t.type.name.includes(tipo);
        });
        return okNombre && okId && okTipo;
    });
    
    mostrar(filtrados);
}

function limpiarFiltros() {
    document.getElementById('filtro-nombre').value = '';
    document.getElementById('filtro-id').value = '';
    document.getElementById('filtro-tipo').value = '';
    mostrar(todosLosPokemon);
}

cargarPokemon();
