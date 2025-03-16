import cors from "cors";
import express, { json } from "express";
import router from "./routes/app.routes";

const app = express();
const port = process.env.PORT || 5000;

async function main() {
  app.use(
    cors({
      origin: "*", // ✅ 모든 도메인에서 접근 가능 (일단 테스트용)
      methods: ["POST", "GET", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
      credentials: true, // ✅ 쿠키 포함 요청을 허용할 경우 필요
    })
  );
  app.use(json());
  app.use("/api", router);
  app.listen(port, () => {
    console.log(`서버 돌아가는중 포트번호: ${port}`);
  });
}

main();
