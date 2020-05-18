const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app =  express();

let corsOption = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOption));

// parse request of json
app.use(bodyParser.json());

// parse request of form urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// test route
app.get('/', (req, res) => {
  res.send({
    message:'welcome bitch'
  });
});

// call sequelize to prepare database
const db = require('./models/index.js');
db.sequelize.sync();

// require tutorials route
require('./routes/tutorial.routes.js')(app);

// set port
const PORT = process.env.PORT || 8080;

// listen to port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});