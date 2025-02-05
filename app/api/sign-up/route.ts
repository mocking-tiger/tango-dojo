import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("회원가입 데이터", data);

    return NextResponse.json({ message: " 회원가입 성공" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
