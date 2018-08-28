#! /usr/bin/env node
const markdownLinkExtractor = require('../js/linkExtrae');
// para guardar lo que la persona escribe 
const path = require('path');
// file system con mas opciones
const fs = require('fs-extra');
// importa la info del fyleSistem, permite ingresar al archivo readme
const [, , ...args] = process.argv;
// obtiene la ruta.
let pathAbs = args[0];

let take = ((ruta) => {
  // utf es para que lo convierta de binario a lenguaje humano
  // throw es de la documentacion para el error
  // readFile lee el archivo en la ruta que le pase como parametro.
  fs.readFile(`${ruta}`, 'utf-8', (err, data) => {
    if (err) throw err;
    markdownLinkExtractor(data);
  });
});

if (!path.isAbsolute(pathAbs)) {
  let ubicPath = process.cwd(pathAbs);
  // ubica la ruta ingresada en la terminal.
  let joinPath = path.join(ubicPath, pathAbs);
  // une las rutas
  take(joinPath);
}