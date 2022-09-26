import express, { Request, Response } from "express";
import { apiRouter } from "./routes";
import cors from "cors";
import server from "./config/env/server.config";

export const app = express();
app.use(cors());
app.use(express.json()); // used to decode the incoming requests

// this is the main endpoint for the application that holds api application 🔹
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to storefront-api hosted at aws");
});

// All routers here 🔹
app.use("/api", apiRouter);

app.listen(server.PORT, function (): void {
  console.log(`express has started on port ${server.PORT}`);
});
