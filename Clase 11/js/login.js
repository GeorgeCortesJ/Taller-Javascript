let formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (event) {
    event.preventDefault();

    let datos = new FormData(formulario);

    let usuario = {
        correo: datos.get('email'),
        contraseña: datos.get('password')
    };

    fetch('http://www.tallerweb.somee.com/api/Usuario',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then((respuesta) => {
            if (respuesta == true) {
                window.location.href = '/Clase%2011/agregarInventario.html';
            } else {
                Swal.fire({
                    title: 'Error! Credenciales incorrectas',
                    text: 'El correo o la contraseña son incorrectos',
                    timer: 3000,
                    icon: 'error'
                });
            }
        })
        .catch(console.log)
})