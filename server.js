import express from "express";
import { ConnectToMongoDB, getDB } from "./src/config/MongoDBConnection.js";
import { ObjectId } from "mongodb";

const server = express();
server.use(express.json());

server.get("/books", async (req, res) => {
  const db = getDB().collection("books");
  //const collection = db.collection("books");
  const data = await db.find().toArray();
  res.status(200).json({ response: data });
});

server.get("/books/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const db = getDB().collection("books");
      const response = await db.findOne({ _id: new ObjectId(id) });
      if (!response) {
        return res.status(404).json({ status: false, msg: "Item Not Found" });
      }
      return res.status(200).json(response);
    } else {
      return res.json({ msg: "Not a valid ID" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

server.post("/books", async (req, res) => {
  try {
    const newData = req.body;
    const db = getDB().collection("books");
    await db.insertOne(newData);
    return res.status(201).json({ result: "success", response: newData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

server.delete("/books/:id", async (req, res) => {
  try {
    const bookID = req.params.id;
    if (ObjectId.isValid(bookID)) {
      const db = getDB().collection("books");
      const result = await db.deleteOne({ _id: new ObjectId(bookID) });
      if (result.deletedCount > 0) {
        return res
          .status(200)
          .json({ result: "success", response: "Deleted Successfully" });
      } else return res.status(500).json({ msg: "Could not delete the book" });
    } else {
      return res.json({ msg: "Not a valid ID" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal Server Error" });
  }
});

server.patch("/books/:id", async (req, res) => {
  try {
    const newUpdates = req.body;
    const bookID = req.params.id;
    if (ObjectId.isValid(bookID)) {
      const db = getDB().collection("books");
      await db.updateOne({ _id: new ObjectId(bookID) }, { $set: newUpdates });
      return res.status(200).json({
        result: "success",
        response: await db.findOne({ _id: new ObjectId(bookID) }),
      });
    } else {
      return res.json({ msg: "Not a valid ID" });
    }
  } catch (error) {}
});

server.listen(2000, () => {
  console.log("Server is listening on port 2000");
  ConnectToMongoDB();
});
