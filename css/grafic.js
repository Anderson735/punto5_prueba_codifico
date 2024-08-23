
function obtenerValor(){
    let input = document.getElementById('input')
    let valor = input.value
    const arregloNumeros = valor.split(',').map(Number);
    console.log("El valor ingresado es: ", arregloNumeros);
}