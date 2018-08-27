#! /usr/bin/env node

const fs = require('fs-extra');
// importa la info del fyleSistem, permite ingresar al archivo readme
const [, , ...args] = process.argv;
// para guardar lo que la persona escribe 
const path = require('path');
// obtiene la ruta.
let pathAbs = path.resolve(args[0]);

const rutaAbsoluta = (() => {
  if (path.isAbsolute() === true) {
    return path;
  } else {
    return pathAbs;
  }
});

// mostrar el readme en la terminal
console.log(pathAbs);

// DEBO ENTRAR A LA CARPETA QUE CONTIENE LOS MD
// DEBO HACER PATHJOIN DE TODOS LOS ARCHIVOS MD
// PROCESS.CWD
