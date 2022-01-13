const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'), (error) => {
        if (typeof error !== 'undefined') {
            console.log(error.message);
        }
    })
});

app.listen(port);
console.log(`server started at http://localhost:${port}`);

