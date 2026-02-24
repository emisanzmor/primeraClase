const Auth = {
    SESSION_KEY: 'usuarioActivo',
    
    iniciarSesion: function(usuario) {
        const sesion = {
            nombre: usuario.nombre,
            email: usuario.email,
            timestamp: Date.now()
        };
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sesion));
    },
    
    cerrarSesion: function() {
        sessionStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'index.html';
    },
    
    obtenerSesion: function() {
        const sesion = sessionStorage.getItem(this.SESSION_KEY);
        if (sesion) {
            return JSON.parse(sesion);
        }
        return null;
    },
    
    estaAutenticado: function() {
        return this.obtenerSesion() !== null;
    },
    
    protegerPagina: function() {
        if (!this.estaAutenticado()) {
            alert('Debes iniciar sesión para acceder a esta página');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },
    
    redirigirSiAutenticado: function() {
        if (this.estaAutenticado()) {
            window.location.href = 'about.html';
            return true;
        }
        return false;
    }
};
