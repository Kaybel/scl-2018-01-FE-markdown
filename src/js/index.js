#! /usr/bin/env node

const infoPath = require('../js/promise');
// para guardar lo que la persona escribe 
const path = require('path');
// importa la info del fyleSistem, permite ingresar al archivo readme
const [, , ...args] = process.argv;
// obtiene la ruta.
// los , , ... signifca que va a agrupar varia info, no una sola, plural ! 
let pathAbs = args[0];
// colores 
let colors = require('colors');
// obtiene la ruta absoluta porque la inicializa en 0, / . 
if (!path.isAbsolute(pathAbs)) {
  mdlinks();
}

function mdlinks() {
  let ubicPath = process.cwd(pathAbs);
  // ubica la ruta ingresada en la terminal.
  let joinPath = path.join(ubicPath, pathAbs);
  // une las rutas que ingresa el usuario con la ruta absoluta de la terminal
  infoPath(joinPath).then((value) => {
    // se crea la promesa llamada del js promise para que imprima la info en la terminal.
    console.log(value);
    // la info.
  });
};