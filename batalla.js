var pokemones = [];
var p1 = null;
var p2 = null;
var turno = 1;
var turnosP1 = 0;
var turnosP2 = 0;
var vidaP1 = 100;
var vidaP2 = 100;

function cargarPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        .then(function(r) { return r.json(); })
        .then(function(data) {
            data.results.forEach(function(p) {
                fetch(p.url)
                    .then(function(r) { return r.json(); })
                    .then(function(poke) {
                        pokemones.push(poke);
                        llenarSelects();
                    });
            });
        });
}

function llenarSelects() {
    var opts = '<option value="">Elegir...</option>';
    pokemones.sort(function(a, b) { return a.id - b.id; });
    pokemones.forEach(function(p) {
        opts += '<option value="' + p.id + '">' + p.name + '</option>';
    });
    document.getElementById('sel1').innerHTML = opts;
    document.getElementById('sel2').innerHTML = opts;
}

function elegir(n) {
    var id = parseInt(document.getElementById('sel' + n).value);
    var poke = pokemones.find(function(p) { return p.id === id; });
    if (!poke) return;
    
    if (n === 1) p1 = poke;
    else p2 = poke;
    
    document.getElementById('card' + n).innerHTML = 
        '<img src="' + poke.sprites.front_default + '"><p>' + poke.name + '</p>';
    
    document.getElementById('btn-start').disabled = !(p1 && p2 && p1.id !== p2.id);
}

function iniciar() {
    turno = 1; turnosP1 = 0; turnosP2 = 0; vidaP1 = 100; vidaP2 = 100;
    
    document.getElementById('seleccion').style.display = 'none';
    document.getElementById('batalla').style.display = 'block';
    document.getElementById('ganador').style.display = 'none';
    
    document.getElementById('poke1').innerHTML = 
        '<img src="' + p1.sprites.back_default + '"><p><b>' + p1.name + '</b></p><p id="v1">Vida: 100%</p>';
    document.getElementById('poke2').innerHTML = 
        '<img src="' + p2.sprites.front_default + '"><p><b>' + p2.name + '</b></p><p id="v2">Vida: 100%</p>';
    
    log('=== ' + p1.name + ' vs ' + p2.name + ' ===');
    log('Turno de ' + p1.name);
    updateBtns();
}

function log(msg) {
    var l = document.getElementById('log');
    l.innerHTML += '<p>' + msg + '</p>';
    l.scrollTop = l.scrollHeight;
}

function updateBtns() {
    var t = turno % 2 === 1 ? turnosP1 : turnosP2;
    document.getElementById('btn-esp').disabled = t < 3;
    document.getElementById('btn-def').disabled = t < 2;
    document.getElementById('turno').textContent = 
        'Turno ' + turno + ': ' + (turno % 2 === 1 ? p1.name : p2.name);
}

function atacar(tipo) {
    var esP1 = turno % 2 === 1;
    var atk = esP1 ? p1 : p2;
    var def = esP1 ? p2 : p1;
    var fallo = Math.random() < 0.2;
    var dmg = 0;
    
    if (tipo === 'normal') {
        dmg = fallo ? 0 : Math.floor(Math.random() * 15) + 10;
        log(atk.name + ' usa ataque... ' + (fallo ? 'falló!' : '-' + dmg + ' hp'));
    }
    if (tipo === 'especial') {
        dmg = fallo ? 0 : Math.floor(Math.random() * 25) + 20;
        log(atk.name + ' usa ataque especial... ' + (fallo ? 'falló!' : '-' + dmg + ' hp'));
    }
    if (tipo === 'defensa') {
        if (!fallo) {
            var cura = Math.floor(Math.random() * 15) + 10;
            if (esP1) vidaP1 = Math.min(100, vidaP1 + cura);
            else vidaP2 = Math.min(100, vidaP2 + cura);
            log(atk.name + ' usa defensa... +' + cura + ' hp');
        } else {
            log(atk.name + ' usa defensa... falló!');
        }
    }
    
    if (dmg > 0) {
        if (esP1) vidaP2 = Math.max(0, vidaP2 - dmg);
        else vidaP1 = Math.max(0, vidaP1 - dmg);
        log(def.name + ' tiene ' + (esP1 ? vidaP2 : vidaP1) + '% de vida');
    }
    
    document.getElementById('v1').textContent = 'Vida: ' + vidaP1 + '%';
    document.getElementById('v2').textContent = 'Vida: ' + vidaP2 + '%';
    
    if (vidaP1 <= 0 || vidaP2 <= 0) {
        var ganador = vidaP1 > 0 ? p1 : p2;
        log('');
        log('>>> ' + ganador.name + ' GANA! <<<');
        document.getElementById('batalla').style.display = 'none';
        document.getElementById('ganador').style.display = 'block';
        document.getElementById('ganador').innerHTML = 
            '<h2>GANADOR</h2><img src="' + ganador.sprites.front_default + '"><h3>' + ganador.name + '</h3>';
        return;
    }
    
    if (esP1) turnosP1++; else turnosP2++;
    turno++;
    log('');
    log('Turno ' + turno + ' - ' + (turno % 2 === 1 ? p1.name : p2.name));
    updateBtns();
}

function reiniciar() {
    p1 = null; p2 = null;
    document.getElementById('seleccion').style.display = 'block';
    document.getElementById('batalla').style.display = 'none';
    document.getElementById('ganador').style.display = 'none';
    document.getElementById('log').innerHTML = '';
    document.getElementById('card1').innerHTML = '';
    document.getElementById('card2').innerHTML = '';
    document.getElementById('sel1').value = '';
    document.getElementById('sel2').value = '';
    document.getElementById('btn-start').disabled = true;
}

cargarPokemon();
