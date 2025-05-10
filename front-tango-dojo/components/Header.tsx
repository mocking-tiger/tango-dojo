"use client";

import MainTitle from "./MainTitle";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    console.log("로그아웃 처리");
    Cookies.remove("dojoAccessToken");
    router.push("/");
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
