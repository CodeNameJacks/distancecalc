const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();
const port = process.env.PORT || 3000;

//instance of express using cors
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//establish Mongo client
const {MongoClient}=require("mongodb");
const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);
let db; //for database connection


/* KEEP FOR TESTING
//keep for testing if backend server running
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//keep for testing api endpoint - Use this to test intial setup of api frontend/backend to see if it works
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
*/

//establish database connection
async function dbConnect(){
  try {
    await client.connect();
    db = client.db(process.env.MONGO_DB_NAME);
    if(db){
      console.log("Connected to database");
    }else{
      console.log("Databse connection failed");
    }
  } 
  catch(err){
      console.log('Attempt to connect to database failed: ' + err);
  }

}

//function to connect to db and start Node server
function startApp() {
let connect = dbConnect();
   if(connect){
      app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
      });
    }else{
      console.log('Express Node.js server not started')
    }
}


//function call to start Node server and db connection
startApp();

/**** API ENDPOINTS  *****/
