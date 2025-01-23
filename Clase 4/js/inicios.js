function sumar() {
    let numero_1 = parseInt(document.getElementById('primerNumero').value);
    let numero_2 = parseInt(document.getElementById('segundoNumero').value);
    let resultado = numero_1 + numero_2;
    return resultado;
}

function resultado() {
    document.getElementById('resultado').innerText = `Resultado: ${sumar()}`;
}