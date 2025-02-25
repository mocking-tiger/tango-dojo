import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("tango-dojo 백엔드 도는중");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`서버 돌아가는중 포트번호: ${PORT}`);
});

app.get("/users", async (req: any, res: any) => {
  try {
    const response = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "서버 오류" });
  }
});

app.post("/users", async (req: any, res: any) => {
  try {
    const { email, name, password } = req.body;

    // 프론트에서 막았지만 혹시 모르니까 한번 더
    if (!email || !name || !password) {
      return res.status(400).json({ error: "비어있는 필드 있음" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    console.log("회원가입 실패:", error);
    res.status(400).json({ error: "사용자 생성 실패", details: error.message });
  }
});
