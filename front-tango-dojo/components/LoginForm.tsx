"use client";

import LandingPageButton from "./LandingPageButton";
import Link from "next/link";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault(); // Form태그의 기본 동작을 막음

    try {
      const response = await fetch("http://localhost:5001/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공"); // 테스트용 로그
        router.push("/dashboard");
      } else {
        alert(data?.error || data?.message || "로그인 실패");
      }
    } catch (e) {
      console.log("로그인 요청 실패: ", e);
      alert("서버와 통신에 실패했습니다.");
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-[30px]" onSubmit={handleSignIn}>
      <Input title="이메일" name="email" onChange={handleInputChange} />
      <Input title="비밀번호" name="password" onChange={handleInputChange} />
      <div className="mt-[50px] text-center flex flex-col gap-[30px] overflow-hidden">
        <LandingPageButton title="수련 시작" />
        <Link href="/sign-up">
          <LandingPageButton title="도장 등록" />
        </Link>
      </div>
    </form>
  );
}
