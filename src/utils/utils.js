function analizar(datos) {
  const contador = {};

  for (const tipo in datos) {
    if (contador.hasOwnProperty(datos[tipo])) {
      contador[datos[tipo]]++;
    } else {
      contador[datos[tipo]] = 1;
    }
  }

  return contador;
}

const generarRespuesta = (respuestas) => {
    var contadorRespuestas = {};
  
    // Iterar sobre las respuestas
    for (var pregunta in respuestas) {
      if (respuestas.hasOwnProperty(pregunta)) {
        var respuesta = respuestas[pregunta];
  
        // Incrementar el contador de la respuesta actual
        if (contadorRespuestas[respuesta]) {
          contadorRespuestas[respuesta]++;
        } else {
          contadorRespuestas[respuesta] = 1;
        }
      }
    }
  
    var respuestaMasRepetida;
    var maxRepeticiones = 0;
  
    // Encontrar la respuesta más repetida
    for (var respuesta in contadorRespuestas) {
      if (contadorRespuestas.hasOwnProperty(respuesta)) {
        var repeticiones = contadorRespuestas[respuesta];
  
        if (repeticiones > maxRepeticiones) {
          maxRepeticiones = repeticiones;
          respuestaMasRepetida = respuesta;
        }
      }
    }

    const respuestaFinal = {
        resultado: respuestaMasRepetida,
        repeticiones: maxRepeticiones
    }
  
    return respuestaFinal
  }
  
  

  const contarRepeticiones = (objetos) => {
    var contador = {};
  
    // Iterar sobre los objetos
    for (var i = 0; i < objetos.length; i++) {
      var resultado = objetos[i].resultado_final;
  
      // Incrementar el contador del resultado actual
      if (contador[resultado]) {
        contador[resultado]++;
      } else {
        contador[resultado] = 1;
      }
    }
  
    // Crear arreglos para almacenar los datos y el número de repeticiones
    var datos = [];
    var repeticiones = [];
  
    // Iterar sobre el contador y agregar los valores al arreglo
    for (var resultado in contador) {
      if (contador.hasOwnProperty(resultado)) {
        datos.push(resultado);
        repeticiones.push(contador[resultado]);
      }
    }
  
    return {
      datos: datos,
      repeticiones: repeticiones
    };
  }
  

  module.exports = {generarRespuesta, contarRepeticiones, analizar}