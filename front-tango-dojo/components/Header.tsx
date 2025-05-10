"use client";

import MainTitle from "./MainTitle";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5001/api/sign-out", {
        method: "POST",
        credentials: "include", // ✅ 쿠키 전송
      });
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <header className="w-full h-[40px] absolute bg-white shadow-lg">
      <MainTitle forHeader />
      <div className="mr-[20px] absolute top-[5px] right-0">
        프로필 들어갈 곳
      </div>
      <div
        className="mr-[20px] absolute top-[5px] right-32 cursor-pointer"
        onClick={handleLogout}
      >
        로그아웃
      </div>
    </header>
  );
}
