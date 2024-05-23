const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

const outputFilePath = path.join(__dirname, 'output.json');

// Ensure the output.json file exists and is initialized
if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
}

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'showForm.html'));
});

app.post('/showForm', (req, res) => {
    const { fname, lname, input1, input2 } = req.body;
    const result = parseInt(input1) + parseInt(input2);
    const newEntry = { fname, lname, result };

    // Read existing data
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data', parseError);
                jsonData = [];
            }
        }
        jsonData.push(newEntry);

        // Write new data
        fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
            res.redirect('/showData');
        });
    });
});

app.get('/showData', (req, res) => {
    fs.readFile(outputFilePath, 'utf8', (err, data) => {
        let jsonData = [];
        if (data) {
            try {
                jsonData = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing JSON data', parseError);
                jsonData = [];
            }
        }
        res.send(`<pre>${JSON.stringify(jsonData, null, 2)}</pre>`);
    });
});

app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});
