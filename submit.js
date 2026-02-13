const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    // Obtener los valores de los inputs.
    const nombre = document.getElementById('nombre').value;
    const password = document.getElementById('password').value;
    
    // Validación de campos si estan vacios
    if (nombre === '' || password === '') {
        alert('Por favor, completa todos los campos');
        return;
    }
    
    console.log('Nombre:', nombre);
    console.log('Password:', password);
    
    alert('Formulario enviado correctamente!');
    
    form.reset();
});
