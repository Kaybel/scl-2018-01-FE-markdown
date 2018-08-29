#! /usr/bin/env node

const infoPath = require('../js/promise');
// para guardar lo que la persona escribe 
const path = require('path');
// importa la info del fyleSistem, permite ingresar al archivo readme
const [, , ...args] = process.argv;
// obtiene la ruta.
let pathAbs = args[0];

if (!path.isAbsolute(pathAbs)) {
  mdlinks();
}

function mdlinks() {
  let ubicPath = process.cwd(pathAbs);
  // ubica la ruta ingresada en la terminal.
  let joinPath = path.join(ubicPath, pathAbs);
  // une las rutas
  infoPath(joinPath).then((value) => {
    console.log(value);
  });
};