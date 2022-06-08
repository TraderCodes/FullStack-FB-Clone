const express = require('express');
const cors = require('cors');
const app = express();
// filter the website that can connect to
const options = {
  origin: 'http://localhost:3000',
  useSuccessStatus: 200,
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('welcome from home');
});
app.get('/books', (req, res) => {
  res.send('book');
});
app.listen(8000, () => {
  console.log('server is listening...');
});

// add nodemon npm i nodemon
// add cors , npm i cors
// then import cors
