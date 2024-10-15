const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries')
const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
    console.log('in listen')
  })

  app.get('/users', db.getUsers)
  app.get('/identificationdata', db.getIdentificationsData)
  app.get('/getallusercitizendata', db.getallUsersCitizen)
  app.get('/getallstatesdata', db.getallState)
  app.get('/getalldistrictsdata/:id', db.getDistricts)
  app.get('/getalltalukadata/:id', db.getTalukas)

  //app.get('/getdistrictbystateid/:stateid', db.getDistrictBystateId)

  /*app.get('/getdistrictbystateid/:stateid', (req, res) => {
    const stateid = req.params.stateid;  // Access route param
    res.send({ message: `state ID received: ${stateid}` });
  })*/