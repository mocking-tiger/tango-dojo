import cors from "cors";
import express, { json } from "express";
import router from "./routes/app.routes";

const app = express();
const port = process.env.PORT || 5001;

async function main() {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      methods: ["POST", "GET", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );
  app.use(json());
  app.use("/api", router);
  app.listen(port, () => {
    console.log(`서버 돌아가는중 포트번호: ${port}`);
  });
}

main();
