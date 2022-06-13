const express = require('express');
const cors = require('cors');
const app = express();
const { readdirSync } = require('fs'); //read files in the folder
const dotenv = require('dotenv');
dotenv.config();

// filter the website that can connect to
const options = {
  origin: 'http://localhost:3000',
  useSuccessStatus: 200,
};
app.use(cors(options));

// app.use('/', useRoutes) ✔ instead of using this we use below ;
// require('./routes/'+r) is everyfile name we set to
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// ADD nodemon npm i nodemon
// ADD cors , npm i cors
// ADD .ENV , npm i dotenv
// then import cors
// connect to mongodatabase install mongodb and mongoose
