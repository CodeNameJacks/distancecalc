const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

//test api endpoint - Use this to test intial setup of api to see if it works
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
