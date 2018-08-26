const fetch = require('node-fetch');

fetch('https://stackoverflow.com/questions/9874382/whats-the-difference-between-process-cwd-vs-dirname')
  .then((response) => {
    console.log(response);
  });
