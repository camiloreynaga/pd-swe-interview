import dotenv from "dotenv";
import express, { type Express } from "express";
import helmet from "helmet";
import { addReading, getFarmersByCountry } from "./database";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post("/data", async (req, res) => {
  // TODO: parse incoming data, and save it to the database
  // data is of the form:
  //  {farmerid} {attribute} {value}

  return res.json({ success: false });
});

app.get("/aggregate", async (req, res) => {
  // TODO: check what country has been requested, and return aggregates for the
  // named attributes for all farmers in that country
  return res.json({ success: false });
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
