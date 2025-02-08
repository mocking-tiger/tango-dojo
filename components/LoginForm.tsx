"use client";

import Input from "./Input";
import LandingPageButton from "./LandingPageButton";
import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const tempFunction = async (e: MouseEvent<HTMLFormElement>) => {
    // const target = e.target as HTMLButtonElement;
    e.preventDefault();
    // console.log(target.name);

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("로그인 성공");
        console.log(data);
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.log("로그인 요청 실패: ", e);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-[30px]" onSubmit={tempFunction}>
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
