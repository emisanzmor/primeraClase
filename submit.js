const usuariosPredefinidos = [
    { nombre: "admin", email: "admin@email.com", password: "1234" },
    { nombre: "usuario1", email: "user1@email.com", password: "password123" },
    { nombre: "juan", email: "juan@email.com", password: "juanito" }
];

function inicializarUsuarios() {
    const usuariosGuardados = localStorage.getItem('usuarios');
    
    if (!usuariosGuardados) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosPredefinidos));
        console.log('Usuarios predefinidos cargados:', usuariosPredefinidos);
    } else {
        console.log('Usuarios existentes:', JSON.parse(usuariosGuardados));
    }
}

function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuarios');
    if (usuarios) {
        return JSON.parse(usuarios);
    }
    return [];
}

function guardarUsuario(nuevoUsuario) {
    const usuarios = obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario guardado:', nuevoUsuario);
    console.log('Todos los usuarios ahora:', usuarios);
}

function verificarLogin(nombre, password) {
    const usuarios = obtenerUsuarios();
    
    const usuarioEncontrado = usuarios.find(function(usuario) {
        return usuario.nombre === nombre && usuario.password === password;
    });
    
    return usuarioEncontrado;
}

function nombreExiste(nombre) {
    const usuarios = obtenerUsuarios();
    const existe = usuarios.find(function(usuario) {
        return usuario.nombre === nombre;
    });
    return existe !== undefined;
}

inicializarUsuarios();

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const password = document.getElementById('password').value;
        
        if (nombre === '' || password === '') {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        console.log('Intentando login con:', nombre, password);
        
        const usuario = verificarLogin(nombre, password);
        
        if (usuario) {
            alert('¡Bienvenido ' + usuario.nombre + '! Login exitoso');
            console.log('Login exitoso para:', usuario);
        } else {
            alert('Usuario o contraseña incorrectos');
            console.log('Login fallido');
        }
    });
}

const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (nombre === '' || email === '' || password === '' || confirmPassword === '') {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        
        if (nombreExiste(nombre)) {
            alert('Este nombre de usuario ya existe');
            return;
        }
        
        const nuevoUsuario = {
            nombre: nombre,
            email: email,
            password: password
        };
        
        console.log('=== NUEVO REGISTRO ===');
        console.log('Nombre:', nuevoUsuario.nombre);
        console.log('Email:', nuevoUsuario.email);
        console.log('Password:', nuevoUsuario.password);
        console.log('======================');
        
        guardarUsuario(nuevoUsuario);
        
        alert('¡Registro exitoso! Ya puedes iniciar sesión');
        
        registerForm.reset();
    });
}
