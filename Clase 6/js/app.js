//Indicamos como trabajamos el parqueo y cuantos espacios hay
const espacios = 20;
const parqueoVector = [];

//Creamos un vector con los espacios del parqueo
for (let i = 0; i < espacios; i++) {
    parqueoVector.push({
        id: i + 1,
        ocupado: false,
        placa: null
    });
}

//Obtenemos los elementos del HTML
const contenedorParqueo = document.getElementById('parqueo');
const formularioEntrada = document.getElementById('entrada');
const formularioSalida = document.getElementById('salida');

//Funcion para mostrar los espacios del parqueo
function renderParqueo() {
    contenedorParqueo.innerHTML = '';
    parqueoVector.forEach((espacio) => {
        const espacioElemento = document.createElement('div');
        espacioElemento.className = `espacioParqueo ${espacio.ocupado ? 'ocupado' : 'libre'}`;
        espacioElemento.textContent = espacio.ocupado ? espacio.placa : 'Libre';
        contenedorParqueo.appendChild(espacioElemento);
    });
}

//Agregamos evento al formulario entrada y se muestra la placa en el espacio
formularioEntrada.addEventListener('submit', evento => {
    evento.preventDefault();
    const placa = document.getElementById('placa').value.trim();
    const espacioLibre = parqueoVector.find(espacio => !espacio.ocupado);

    if (!espacioLibre) {
        alert('No hay espacios disponibles');
        return;
    }

    espacioLibre.ocupado = true;
    espacioLibre.placa = placa;
    renderParqueo();
    formularioEntrada.reset();
});

//Agregamos evento al formulario salida y se muestra el espacio libre
formularioSalida.addEventListener('submit', evento => {
    evento.preventDefault();
    const placa = document.getElementById('placa-salida').value.trim();
    const espacioOcupado = parqueoVector.find(espacio => espacio.ocupado && espacio.placa === placa);

    if (!espacioOcupado) {
        alert('No se encontró la placa');
        return;
    }

    espacioOcupado.ocupado = false;
    espacioOcupado.placa = null;
    renderParqueo();
    formularioSalida.reset();
});

//Mostramos los espacios del parqueo
renderParqueo();