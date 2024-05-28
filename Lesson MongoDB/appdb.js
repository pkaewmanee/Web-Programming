const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Product_CI2024';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('products');
  //Insert One Item
//   var obj = { name: "Coffee Mug", price: Math.round(Math.random() * 10 + 10) }
//   const insertResult = await collection.insertOne(obj);
  var obj = [ 
              { name: "Book", price: 10 },
              { name: "Pencil", price: 5 },
              { name: "Calculator", price: 40 },
              { name: "Notebook", price: 15 },
              { name: "T-Shirt", price: 20 },
              { name: "Jacket", price: 20 }
            ]
  const insertResult = await collection.insertMany(obj);

console.log('Inserted documents =>', insertResult);

//   const findResult = await collection.findOne({});
//   console.log(findResult);
//   const findResult = await collection.find({}).toArray();
//   console.log(findResult);
//   const query = {name: 'Pencil'};
// const query = {name: /^C/};
// const findResult = await collection.find(query).toArray();
  // const findResult = await collection.find({}).sort({name: -1}).toArray();
  // const findResult = await collection.deleteOne({name: "Book"});
  // const findResult = await collection.updateOne(
  //   {name: "Notebook"}, {$set: {name: "EGCI Book", price: 15}});
  // console.log(findResult);

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());