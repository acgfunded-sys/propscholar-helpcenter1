import express from "express";
import { PrismaClient } from "@prisma/client";
import routes from "./routes";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Propscholar API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});