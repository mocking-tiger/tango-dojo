import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!user) {
      return NextResponse.json(
        { message: "존재하지 않는 이메일입니다." },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다" },
        { status: 401 }
      );
    }
    // eslint-disable-next-line
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "로그인 성공", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
