import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017/bookStore";
const client = new MongoClient(url);

export const ConnectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
    console.log("Error while connecting to MongoDB");
  }
};

export const getDB = () => {
  return client.db();
};
