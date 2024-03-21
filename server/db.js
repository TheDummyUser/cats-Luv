import { MongoClient } from "mongodb";

let dbConnection;

const connectToDb = (cb) => {
  MongoClient.connect("mongodb://localhost:27017/catsLuv")
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

const getDb = () => dbConnection;

export { connectToDb, getDb };
