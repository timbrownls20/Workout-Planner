const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const {config} = require('./config');

console.log(config)

let port = config.Port;
let app = express();

app.use(
    cors()
)

app.listen(port, console.log(`listening on port ${port}`));

app.get('/', (req, res) => {
    res.send('available');
});

app.get('/exercises', async (req, res) => {
    let data = await loadData("src/data/exerciseData.json");
    res.send(JSON.parse(data))
});

async function loadData(filePath) {
    const data = await fs.readFile(filePath);
    return data;
}