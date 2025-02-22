import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET || "중요한건꺾이지않는마음";

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

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // eslint-disable-next-line
    const { password: _, ...userWithoutPassword } = user;

    const response = NextResponse.json(
      { message: "로그인 성공", user: userWithoutPassword, token },
      { status: 200 }
    );
    response.cookies.set("dojoAccessToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
