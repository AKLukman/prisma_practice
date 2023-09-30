import { PrismaClient } from "@prisma/client";
import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;

const prisma = new PrismaClient();

async function main() {
  app.listen(port, () => {
    console.log(`server running at ${port}`);
  });
}
main();
