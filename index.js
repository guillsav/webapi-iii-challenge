const express = require('express');
const morgan = require('morgan');

const server = express();

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
