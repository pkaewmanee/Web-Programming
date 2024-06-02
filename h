Please submit your JS code in the text file

- Read users.json file and show the information of a specific user according to the id.
- The password must be encrypted using 'sha1' before showing on the webpage.
- Calling the URL: http://localhost:8081/profile/1 to show the information of user id 1
For Example:
http://localhost:8081/profile/1

id: 1
username: bob
password: xxxxxxxxxxxxxxxxxxxxxxx
fullname: Bob Cat

 

//-----users.json-----//
{"users": [
    {
        "username": "bob",
        "password": "1111",
        "fullname": "Bob Cat",
        "id": "0"
    },
    {
        "username": "tom",
        "password": "2222",
        "fullname": "Tom Cat",
        "id": "1"
    },
    {
        "username": "John",
        "password": "3333",
        "fullname": "John Doe",
        "id": "2"
    }
]}

//-----crypto-----//
/*hash = crypto.createHash('sha1')
              .update(json.users[0].password)
              .digest('hex')
*/
