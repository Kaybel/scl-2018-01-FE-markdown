
const Marked = require('marked');
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

// (process.argv + ${funcionquemuestresololinks})
// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      // title: title,
      text: text,
    });
  };

  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      // title: title,
      text: text,
    });
  };
  Marked(markdown, { renderer: renderer });

  return links;
};

module.exports = infoPath;