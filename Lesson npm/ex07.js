const crypto = require('crypto');
const fs = require('fs');

const shasum = crypto.createHash('sha1');
const s = fs.ReadStream('file.txt');

s.on('data', d=> {
    shasum.update(d);
})

s.on('end', () => {
    let d = shasum.digest('hex');
    console.log(d + '=> file.txt');
})