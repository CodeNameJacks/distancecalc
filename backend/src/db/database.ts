//establish database connection
import { MongoClient, Db } from 'mongodb';
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);

let db: Db;

export async function connectToDatabase(): Promise<Db> {
    try{
        if (!db) {
            await client.connect();
            db = client.db(process.env.MONGO_DB_NAME);
            if(db){
                console.log("Connected to database");
            }else{
                console.log("Databse connection failed");
            }
        }
    } 
        catch(err){
        console.log('Attempt to connect to database failed: ' + err);
    }

  return db;
}



