const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Product_CI2024';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('student_records');
    

    // Sub problem A
    console.log(`Sub problem A:`);
    const queryA = {coursename: /Computer programming/i};
    const findResultA = await collection.find(queryA).toArray();
    console.log(findResultA);
    console.log('\n');
    
    // Sub problem B
    console.log(`Sub problem B:`);
    const queryB = {};
    let findResultB = (await collection.find(queryB).toArray()).filter(student => student.mark > 60);
    console.log(findResultB);
    console.log('\n');
    
    // Sub problem C
    console.log(`Sub problem C:`);
    const queryC = {name: /^J/};
    const findResultC = await collection.find(queryC).toArray();
    console.log(findResultC);
    console.log('\n');

    return 'Done!'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());