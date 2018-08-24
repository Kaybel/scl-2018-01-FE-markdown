const fetch = require('node-fetch');


fetch('https://www.asd.cl')
  .then((response) => {
    console.log(response);
  });