
const Marked = require('marked');

// nueva promesa
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        return reject(error);
        // Sabemos que hay un error, así que rechazamos la promesa
        // Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
      }

      return resolve(data);
      // En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
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

  renderer.link = function(href, title, text, status) {
    links.push({
      href: href,
      // title: title,
      text: text,
      status: status,
    });
  };

  renderer.image = function(href, title, text, status) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      // title: title,
      text: text,
      status: status,
    });
  };
  Marked(markdown, { renderer: renderer });
  // console.log(links);

  // hacer fetch de 200 ok

  const fetch = require('node-fetch');

  fetch('https://github.com/Kaybel/scl-2018-01-FE-markdown/blob/master/src/js/fetch.js')
    .then((response) => {
      console.log(response);
    });
  // hacer push de 200 ok

  return links;
};

module.exports = markdownLinkExtractor;