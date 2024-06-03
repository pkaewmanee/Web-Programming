var express = require('express')
var app = express()
var fs = require('fs') //Read userlist.json

//return all data
app.get('/getUsers', function(req,res){
    fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err,data){
        console.log(data) // user.json data
        res.end(data)
    })
})

//return json data according to the ID
app.get('/getUsers/:id', function(req,res){
    fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err,data){
        var users = JSON.parse(data)
        var auser = users["user"+req.params.id]
        console.log(auser) // userlist.json data
        res.end(JSON.stringify(auser))
    })
})

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

/*var user = { //Global user
    "user4": {
        "name": "betty",
        "password": "4444",
        "occupation": "engineer",
        "id": 4
    }
}*/

//Add one user(json) to data
app.post('/addUser', function(req,res){
    fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err,data){
        var users = JSON.parse(data)
        users["user4"] = user["user4"] 
        console.log(users) // userlist.json data
        res.end(JSON.stringify(users))
    })
})


app.delete('/delUser/:id', function(req,res){
    fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err,data){
        var users = JSON.parse(data)
        delete users['user'+req.params.id]
        console.log(users) // userlist.json data
        res.end(JSON.stringify(users))
    })
})

//update user
/*app.put("updateUser/:id", function(req,res){
    fs.readFile(__dirname+"/"+"userlist.json", 'utf8', function(err,data){
        var users = JSON.parse(data)
        
        //code here
        update users['user'+req.params.id]
        console.log(users) // userlist.json data
        res.end(JSON.stringify(users))
    })
})*/

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port)
})	