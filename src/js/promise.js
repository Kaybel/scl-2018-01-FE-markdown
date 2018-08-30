const markdownLinkExtractor = require('../js/funcExtraer');
const fetch = require('node-fetch');

// file system con mas opciones
const fs = require('fs-extra');

function infoPath(filePath) {
  // se crea la nueva promesa 
  return new Promise((resolve, reject) => {
    // primero verifica si hay error o si existe el archivo, si no hay inconvenientes lo recorre buscando los links.
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error);
      }
      // se extrae la info de la funcion indicada en el README.md para recorrer el arr links
      let links = markdownLinkExtractor(data);
      // en el array promise se va a pushear la info de status.
      let promise = [];
      // se recorre links para extraer el link
      links.forEach((url) => {
        // se ingresa al href del link el cual posee la info del status del link y esta info se pushea a promise que es un array vacio
        promise.push(fetch(url.href)
          .then((response) => {
            // se crea la key y se le otorga la info extraida anteriormente como value
            url.filePath = response.filePath;
            url.status = response.status;
            url.statusText = response.statusText;
            // se retorna url dado que ahora el mismo posee el status, si no se retorna no va a "actualizar" la info de status en url. 
            return url;
          })
          // se crea el catch para que, si la url esta rota indique "fail"
          .catch((err) => {
            url.filePath = 'fail';
            url.status = 'fail';
            url.statusText = 'fail';
            url.fileLine = 'fail';
            return url;
          }));
      });
      // promise all toma en cuenta todas las funciones y sus valores para devolver una promesa global.
      Promise.all(promise).then((values) => {
        resolve(links);
      });
    });
  });
};

module.exports = infoPath;