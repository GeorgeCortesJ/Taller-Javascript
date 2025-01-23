
//Función encargada de generar la lista de numeos y detectar los múltiplos
function generarCuenta(){
    //Llama al id de donde se va a mostrar el resultado
    const salida = document.getElementById('salida');

    for (let i = 1; i <= 50; i++) {
        let resultado = '';

        if( i % 3 === 0 && i % 5 === 0){
            resultado = i + ' Soy múltiplo de 3 y de 5!';
        }else if(i % 3 === 0) {
            resultado = i + ' Soy múltiplo de 3!';
        }else if(i % 5 === 0){
            resultado = i + ' Soy múltiplo de 5!';
        }else{
           resultado = i; 
        }

        salida.value += resultado + ', ';
    }

    //console.log('Estoy escuchando el evento :)');
}
    
//Asoiamos el evento con el botón
document.getElementById('generador').addEventListener('click', generarCuenta)