import pool from "@/lib/db";
import { NextResponse } from "next/server";

interface IResponse {
  id: number;
  email: string;
  name: string;
  password: string;
  created_at: Date;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "이메일을 입력해주세요" },
        { status: 400 }
      );
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if ((rows as IResponse[]).length > 0) {
      // console.log(rows);
      return NextResponse.json(
        { message: "중복된 이메일입니다" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "사용 가능한 이메일입니다" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
