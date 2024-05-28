const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Product_CI2024';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('student_records');
    var obj = [ 
        { name: "Bob", courseid: "egci111", coursename: "computer programming", mark: 80 },
        { name: "Tom", courseid: "egci111", coursename: "computer programming", mark: 50 },
        { name: "Sue", courseid: "egci427", coursename: "Web programming", mark: 90 },
        { name: "John", courseid: "egci427", coursename: "Web programming", mark: 70 },
        { name: "Jame", courseid: "egci472", coursename: "Web programming", mark: 60 }
      ]
    const insertResult = await collection.insertMany(obj);
    console.log(insertResult);
      return 'Done!'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());