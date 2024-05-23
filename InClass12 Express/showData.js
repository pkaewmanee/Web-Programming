const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

const outputFilePath = path.join(__dirname, 'output.json');

app.post('/showForm', (req, res) => {
    const { fname, lname, input1, input2 } = req.body;
    const result = parseInt(input1) + parseInt(input2);
    const newEntry = { fname, lname, result };

    // Read existing data
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        let jsonData = [];
        if (!err && data) {
            jsonData = JSON.parse(data);
        }
        jsonData.push(newEntry);

        // Write new data
        fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to output file', err);
            }
            res.redirect('/showData');
        });
    });
});

app.get('/showData', (req, res) => {
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        res.send(`<pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
    });
});

app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});
