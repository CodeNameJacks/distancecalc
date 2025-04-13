var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const port = process.env.PORT || 3000;
//instance of express using cors
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
//establish Mongo client
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
let db; //for database connection
app.get('/', (req, res) => {
    res.send('Hello World!');
});
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            db = client.db(process.env.MONGO_DB_NAME);
            if (db) {
                console.log("Connected to database");
            }
            else {
                console.log("Databse connection failed");
            }
            //const collection = db.collection('historical');
        }
        catch (err) {
            console.log('Attempt to connect to database failed: ' + err);
        }
        // Find the first document in the collection
        // const first = await collection.findOne();
        // console.log(first);
        //} finally {
        // Close the database connection when finished or an error occurs
        //   await client.close();
        //}
    });
}
function startApp() {
    let connect = dbConnect();
    if (connect) {
        app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    }
    else {
        console.log('Express Node.js server not started');
    }
}
/*
//keep for testing api endpoint - Use this to test intial setup of api frontend/backend to see if it works
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
*/
//establish db connection and start Node server
startApp();
//# sourceMappingURL=index.js.map