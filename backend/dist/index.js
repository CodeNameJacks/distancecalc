"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./db/database");
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api');
//instance of express using cors
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes); // mount API routes at /api
//function to connect to db and start Node server
function startApp() {
    let connect = (0, database_1.connectToDatabase)();
    if (connect) {
        app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    }
    else {
        console.log('Express Node.js server not started');
    }
}
//function call to start Node server and db connection
startApp();
/****** KEEP BELOW FOR TESTING PROJET SET UP ******
 
//keep for testing if backend server running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//keep for testing api endpoint - Use this to test intial setup of api frontend/backend to see if it works
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
*/ 
//# sourceMappingURL=index.js.map