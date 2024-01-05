import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://ka_ravisankar:Qwaszxopklnm06@cluster0.akmryci.mongodb.net/?retryWrites=true&w=majority";
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
