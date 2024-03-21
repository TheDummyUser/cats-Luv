import express from "express";
import { connectToDb, getDb } from "./db.js";
import { ObjectId } from "mongodb";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json()); // Corrected line
app.use(cors());
// db connect
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`express is ready ${port}`);
    });
    db = getDb();
  }
});

app.get("/cats", (req, res) => {
  db.collection("cats")
    .find()
    .toArray() // Use toArray() instead of forEach
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch cats ;-;" });
    });
});

app.get("/cats/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("cats")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "unable to fetch ;-;" });
      });
  } else {
    res.status(500).json({ error: "not valid doc id!" });
  }
});

app.post("/cats", (req, res) => {
  const cat = req.body;
  db.collection("cats")
    .insertOne(cat)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "could not create a new cat" }); // Corrected error message
    });
});

app.delete("/cats/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("cats")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "unable to delete" });
      });
  } else {
    res.status(500).json({ error: "not valid doc id!" });
  }
});

app.patch("/cats/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("cats")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "could to update document" });
      });
  } else {
    res.status(500).json({ error: "not valid doc id!" });
  }
});
