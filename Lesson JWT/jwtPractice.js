const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const jwt = require("jsonwebtoken");
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Users';

app.get("/api", (req, res) => {
  res.json({
    description: "My API. Please authenticate!",
  });
});

app.get("/api/userprofile", ensureToken, (req, res) => {
  jwt.verify(req.token, "secret_key_goes_here", function (err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(403);
    } else {
      delete data.password;
      res.json({
        description: `User profile: ${data.username}`,
        data: data,
      });
    }
  });
});

app.post("/api/login", async (req, res) => {
  const body = req.body;
  console.log(body);

  const authorised = await authenticate(body.username, body.password);
  if (!authorised) {
    res.json({
      'message': 'Invalid Username or Password',
      'user': body
    })
    return;
  }

  const token = jwt.sign(body, "secret_key_goes_here");
  res.json({
    message: 'Authenticated! Use this token in the "Authorization" header',
    token: token,
  });
});

app.listen(8180, () => {
  console.log("Server running on http://localhost:8180/");
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

async function authenticate(username, password) {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('login');
  const findResult = await collection.findOne({username: username});
  if (!findResult) return false;
  console.log(username);
  return findResult.password == password;
}