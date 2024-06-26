const { MongoClient } = require('mongodb');
const express = require('express');
const fs = require('fs');
const app = express();

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'EGCI427';

// Load initial data from user.json
let data = JSON.parse(fs.readFileSync(`${__dirname}/userlist.json`, 'utf-8'));

// Function to query students by major
async function queryStudentsByMajor(major) {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('students');

  const query = { major: new RegExp(major, 'i') };
  const findResult = await collection.find(query).toArray();
  await client.close();

  return findResult;
}

// Function to insert a new user into MongoDB
async function insertUser(newUser) {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('students');

  const insertResult = await collection.insertOne(newUser);
  await client.close();

  return insertResult;
}

// Route to find students by major
app.get('/showMajor/:major', async function (req, res) {
  try {
    const major = req.params.major;
    const result = await queryStudentsByMajor(major);
    res.json(result);
  } catch (error) {
    console.error('Error finding students by major:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to insert a new user and update user.json
const iterable = ['name', 'password', 'occupation', 'id'];

app.get('/insertUser/:name/:password/:occupation/:id', function(req, res){
  fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err, data){
      var users = JSON.parse(data);
      var newUserKey = "user" + req.params.id;
      var newUser = {
          "name": req.params.name,
          "password": req.params.password,
          "occupation": req.params.occupation,
          "id": req.params.id
      };
      users[newUserKey] = newUser;
      console.log(users); // userlist.json data
      
      fs.writeFile(__dirname + "/" + "userlist.json", JSON.stringify(users, null, 2), function(err) {
          if (err) throw err;
          res.end(JSON.stringify(users));
      });
  });
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Application running at http://%s:%s", host, port);
});
