import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

interface IFormData {
  email: string;
  name: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const data: IFormData = await req.json();
    console.log("회원가입 데이터", data);

    // 프론트단에서 막았지만 한번 더 체크
    if (!data.email || !data.name || !data.password) {
      return NextResponse.json(
        { message: "입력 안한게 있잖아" },
        { status: 400 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // mysql에 정보 저장
    const query = `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`;
    const values = [data.email, data.name, hashedPassword];

    await pool.execute(query, values);

    return NextResponse.json({ message: " 회원가입 성공" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
