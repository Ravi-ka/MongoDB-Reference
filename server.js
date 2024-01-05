import express from "express";
import { ConnectToMongoDB } from "./src/config/MongoDBConnection.js";

const server = express();

server.get("/book", (req, res) => {
  res.json({ message: "Welcome to API" });
});

server.listen(2000, () => {
  console.log("Server is listening on port 2000");
  ConnectToMongoDB();
});
