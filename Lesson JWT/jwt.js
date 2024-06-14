var express = require('express')
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
var jwt = require('jsonwebtoken');
     
app.get('/api', function api(req, res) {
  res.json({
    description: 'My API. Please authenticate!'
  });
})

app.get('/api/protected', ensureToken, (req, res) => {
  jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!',
        data: data
      });
    }
  });
})

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'test' && password === '1234') {
      const user = { username: username };
      const token = jwt.sign(user, 'secret_key_goes_here');
      
        res.json({
            message: "Authenticated! Use this token in the \"Authorization\" header",
            token: token
        });
    } else {
        res.json({
            message: 'Invalid Username or Password',
            user: {
                username: username,
                password: password
            }
        });
    }
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

app.listen(3000, function () {
  console.log('App listening on port 3000!');
})

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}