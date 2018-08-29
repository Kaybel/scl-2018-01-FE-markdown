const markdownLinkExtractor = require('../js/funcExtraer');
const fetch = require('node-fetch');

// file system con mas opciones
const fs = require('fs-extra');

function infoPath(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error);
      }
      let links = markdownLinkExtractor(data);
      let promise = [];
      links.forEach((url) => {
        promise.push(fetch(url.href)
          .then((response) => {
            url.status = response.status;
            return url;
          })
          .catch((err) => {
            url.status = 'fail';
            return url;
          }));
      });
      Promise.all(promise).then((values) => {
        resolve(links);
      }).catch((err) => {

      });
    });
  });
};

module.exports = infoPath;