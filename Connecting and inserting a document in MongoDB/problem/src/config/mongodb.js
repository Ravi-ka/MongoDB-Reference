// 1. Import MongoDB Client
import { MongoClient } from "mongodb";
const url = 'mongodb://127.0.0.1:27017/confessiondb'

// 2. Function to connect to the database
let client;
export const connectToMongoDB = () => {
    MongoClient.connect(url)
    .then(clientInstance =>{
        client = clientInstance
        console.log("Connected to MongoDB")
    })
    .catch(err=>{
        console.log(err)
    })
};

// 3. Function to access the database
export const getDB = () => {
    return client.db();
};
