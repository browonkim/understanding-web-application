const express = require('express');
const port = 3000;
const host = '0.0.0.0';

const app = express();

app.use(express.static('static'));

app.get('/data1', (req, res) => {
    res.send({
        name: "Kong",
        money: 1203495,
        education: {
            elementary: "AAA",
            middle: "BBB",
            high: "CCC"
        }
    });
});

app.get('/data2', (req, res) => {
    res.send({
        name: "Peter",
        money: 0,
        education: {
            elementary: "AAA",
            middle: "TTT",
            high: "TEQ"
        }
    });
});

app.listen(port, host, () => {
    console.log(`express app is running at ${host + ":" + port}`);
});
