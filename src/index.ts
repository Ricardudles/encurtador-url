import express, { NextFunction, Request, Response } from "express";
import { URLController } from "./controller/URLController";
import { MongoConnection } from "./database/MongoConnection";

const api = express();
const urlController = new URLController();

api.use(express.json());

const database = new MongoConnection();
database.connect();

api.post("/shorten", urlController.shorten);

api.get("/:hash", urlController.redirect);

api.listen(5000, () => {
  console.log("escutando");
});
