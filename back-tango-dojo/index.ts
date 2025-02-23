const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("tango-dojo 백엔드 도는중");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 돌아가는중 포트번호: ${PORT}`);
});

app.get("/users", async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "서버 오류" });
  }
});
