const express = require("express");
const fs = require("fs").promises;
const cors = require("cors");
const { config } = require("./config");

let port = config.Port;
let app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.listen(port, console.log(`listening on port ${port}`));

app.get("/", (req, res) => {
  res.send("available");
});

app.get("/exercises", async (req, res) => {
  let root = "src/data/exerciseData/";
  let path = (await exists(`${root}Current.json`))
    ? `${root}Current.json`
    : `${root}Initial.json`;
  let data = await loadData(path);

  res.send(JSON.parse(data));
});

app.post("/exercises", async (req, res) => {
  console.log(req.body);
  await saveData("src/data/exerciseData/Current.json", req.body);
  res.sendStatus(200);
});

async function loadData(filePath) {
  const data = await fs.readFile(filePath);
  return data;
}

async function saveData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data));
  return true;
}

async function exists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
