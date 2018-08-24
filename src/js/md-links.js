function archivo(link) {
  if (link.indexOf('.md') > 0) {
    return true;
  }
}
function link(link) {
  if (link.indexOf('http') > 0) {
    return true;
  }
}
function rutaRelativa(rel) {
  if (rel.indexOf('/', 0) <= 0) {
    return true;
  }
}

function rutaAbsoluta(abs) {
  if (abs.indexOf('/', 0) > 0) {
    return true;
    console.log('Absoluta');
  } else {
    rutaRelativa();
    console.log('Relativa');
  }
}
function ok() {
  const loadPage = 0;
  if (loadPage >= 200 && loadPage < 300) {
    return true;
  }
}
function strg(argv) {
  // recibir los strings escritos en la terminal (paths)
  const [, , ...args] = process.argv;
  console.log(args);
}
function runMd(ingresoAMd) {
  // para abrir el archivo md en terminal
  let readme = fs.readFileSync('README.md');
}

module.exports = {
  archivo: archivo,
  link: link,
  rutaAbsoluta: rutaAbsoluta,
  ok: ok,
  strg: strg,
  runMd: runMd,
};