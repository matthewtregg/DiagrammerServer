const express = require('express');
const app = new express();
const PORT = 4000;
const router = require('./router');
const cors = require('cors');
const bodyParser = require('body-parser');

app
  .use(cors())
  .use(bodyParser.urlencoded({
      extended: true
    }))
  .use(bodyParser.json())
  .use(router);

app.listen(PORT, () => console.log(`server is listening on ${PORT}`));





