const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Users';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('login');
  var obj = [ 
              {username: 'user1', password: '1234'},
              {username: 'user2', password: '2345'},
              {username: 'user3', password: '3456'},
              {username: 'user4', password: '4567'},
              {username: 'user5', password: '5678'}
            ]
  const insertResult = await collection.insertMany(obj);

console.log('Inserted documents =>', insertResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());