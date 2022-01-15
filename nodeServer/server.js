const express = require('express');
const host = '0.0.0.0';
const port = 3000;

app = express();
app.use(express.static('static'));
app.get('/data', (req, res) => {
    res.send(
        {
            name: "kim",
            id: "kim001",
            money: 100000,

        }
    );
});

app.listen(port, host, () => {
    console.log("run express");
});
