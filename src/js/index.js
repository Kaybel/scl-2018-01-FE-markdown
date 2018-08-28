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

const validate = ((link) => {
  let option = {};
  if (process.argv('--validate') === true) {
    // aqui va funcion para validar los links y se "pushea" al obj

    const fetch = require('node-fetch');

    fetch('aquivaellink')
      .then((response) => {
        console.log(response);
      });
  }
});

const tittle = (() => {
  forEach(element => {

  });
});


// recorrer con forEach para separar titulo del texto
// hacer fetch de 200 ok
// hacer push de 200 ok
// color a la terminal