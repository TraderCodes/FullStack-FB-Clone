const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { readdirSync } = require('fs'); //read files in the folder
const dotenv = require('dotenv');
dotenv.config();

// filter the website that can connect to

app.use(cors());

app.use(express.json()); // set up json

// app.use('/', useRoutes) ✔ instead of using this we use below ;
// require('./routes/'+r) is everyfile name we set to
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)));

// DATA BASE
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb database', err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// ADD nodemon npm i nodemon
// ADD cors , npm i cors
// ADD .ENV , npm i dotenv
// then import cors
// connect to mongodatabase install mongodb and mongoose
// set up json
// set up user regitser
//work on user validation 
//  npm i bcrypt for password 
// adding reccursive validation for username 
// adding jaon web token npm i jsonwebtoken
// install google api i googleapis nodemailer