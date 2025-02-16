import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(`SELECT mean FROM words`);

    return NextResponse.json(rows, { status: 200 });
  } catch (e) {
    console.error("뜻 가져오기 실패", e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
