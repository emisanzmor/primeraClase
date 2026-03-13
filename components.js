function cargarHeader() {
    const header = document.querySelector('header');
    if (header) {
        const sesion = Auth.obtenerSesion();
        
        let menuItems = '';
        let userSection = '';
        
        if (sesion) {
            menuItems = `
                <li><a href="about.html">Pokédex</a></li>
                <li><a href="batalla.html">Batalla</a></li>
                <li><a href="contact.html">Contact</a></li>
            `;
            userSection = `
                <div class="user-section">
                    <span class="user-name">Hola, ${sesion.nombre}</span>
                    <button onclick="Auth.cerrarSesion()" class="logout-btn">Cerrar Sesión</button>
                </div>
            `;
        } else {
            menuItems = `
                <li><a href="index.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
            `;
        }
        
        header.innerHTML = `
            <nav>
                <ul>
                    ${menuItems}
                </ul>
                ${userSection}
            </nav>
        `;
    }
}

function cargarFooter() {
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
            <p>Copyright 2026</p>
        `;
    }
}

cargarHeader();
cargarFooter();
