document.addEventListener('DOMContentLoaded', function() {
    cargarContactosRemotos();

    var form = document.getElementById('agenda-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        agregarContacto();
    });
});

// Capa de Servicio / Consumo con CORS (API simulada o pública de ejemplo)
function cargarContactosRemotos() {
    // Usamos una API pública de prueba que permite solicitudes CORS (JSONPlaceholder)
    fetch('https://jsonplaceholder.typicode.com/users?_limit=3', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors' // Manejo explícito de CORS
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Error en la red al intentar consumir el recurso con CORS.');
        }
        return response.json();
    })
    .then(function(data) {
        mostrarContactos(data);
    })
    .catch(function(error) {
        console.error('Problema con la petición CORS:', error);
    });
}

function mostrarContactos(contactos) {
    var contenedor = document.getElementById('items-container');
    contenedor.innerHTML = '';

    for (var i = 0; i < contactos.length; i++) {
        var li = document.createElement('li');
        li.className = 'agenda-item';
        
        var h3 = document.createElement('h3');
        h3.innerText = contactos[i].name;

        var p = document.createElement('p');
        p.innerText = 'Email: ' + contactos[i].email + ' | Tel: ' + contactos[i].phone;

        li.appendChild(h3);
        li.appendChild(p);
        contenedor.appendChild(li);
    }
}

function agregarContacto() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;

    if (nombre === '' || email === '') {
        alert('Por favor completa los campos');
        return;
    }

    // Simulación de envío mediante POST con CORS
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            name: nombre,
            email: email,
            phone: '000-000-0000'
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        mode: 'cors'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        alert('Contacto agregado exitosamente (Simulado via CORS)');
        
        // Agregar dinámicamente a la interfaz multicapa
        var contenedor = document.getElementById('items-container');
        var li = document.createElement('li');
        li.className = 'agenda-item';
        li.innerHTML = '<h3>' + data.name + '</h3><p>Email: ' + data.email + '</p>';
        contenedor.prepend(li);

        document.getElementById('agenda-form').reset();
    })
    .catch(function(error) {
        console.error('Error al enviar datos:', error);
    });
}