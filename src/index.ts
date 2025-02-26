import dotenv from "dotenv";
import express, { type Express } from "express";
import helmet from "helmet";
import { addReading, getFarmersByCountry, Aggregate } from "./database"; // Importar Aggregate

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post("/data", async (req, res) => {
  const data = req.body;
  const lines = data.split("\n");
  let allValid = true;

  for (const line of lines) {
    const parts = line.split(" ");
    if (parts.length < 3) {
      allValid = false;
      continue;
    }

    const [farmerId, attribute, ...valueParts] = parts;
    let value: unknown = valueParts.join(" ").trim();

    if (!isNaN(Number(value))) {
      value = Number(value);
    } else if (value === "true" || value === "false") {
      value = value === "true";
    }

    try {
      addReading({ farmerId, attribute, value });
    } catch (error) {
      allValid = false;
    }
  }

  if (allValid) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/aggregate", async (req, res) => {
  const { country, attributes } = req.query;

  if (!country || !attributes) {
    return res.status(400).json({ error: "Faltan parámetros requeridos" });
  }

  const attributeList = (attributes as string).split(",");
  const farmers = getFarmersByCountry(country as string);

  const result: { [key: string]: Aggregate } = {};

  attributeList.forEach((attr) => {
    const values = farmers
      .map((farmer) => farmer[attr])
      .filter((value) => typeof value === "number") as number[];

    if (values.length > 0) {
      result[attr] = {
        min: Math.min(...values),
        max: Math.max(...values),
        sum: values.reduce((acc, val) => acc + val, 0),
        count: values.length,
      };
    }
  });

  res.json({ attributes: result });
});

app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
