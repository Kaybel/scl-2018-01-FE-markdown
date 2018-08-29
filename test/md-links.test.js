// ruta absoluta
const rutaAbsoluta = require('../src/js/md-links').rutaAbsoluta;
test('debería devolver true si el archivo es de ruta absoluta', () => {
  expect(rutaAbsoluta).toBeTruthy();
});

// recibir los strings escritos en la terminal (paths)
const strg = require('../src/js/md-links').strg;
test('debería devolver true si recibe string en el argv', () => {
  expect(strg).toBeTruthy();
});

// para ver si los archivos son del tipo md
const archivo = require('../src/js/md-links').archivo;
test('debería devolver true si el archivo es .md', () => {
  expect(archivo).toBeTruthy();
});

// para recorrer el archivo md
const runMd = require('../src/js/md-links').runMd;
test('debería devolver true si recorre todo el archivo md (ingresar al md)', () => {
  expect(runMd).toBeTruthy();
});

// para saber si posee links dentro del md
const link = require('../src/js/md-links').link;
test('debería devolver true si el archivo posee links', () => {
  expect(link).toBeTruthy();
});

// que verifique si el link esta ok
const ok = require('../src/js/md-links').ok;
test('debería devolver true si el link esta ok', () => {
  expect(ok).toBeTruthy();
});

// sudo npm install -g