"use client";

import { MouseEvent } from "react";
import Input from "./Input";
import LandingPageButton from "./LandingPageButton";
import Link from "next/link";

export default function LoginForm() {
  const tempFunction = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    console.log(target.name);
  };

  return (
    <form className="flex flex-col gap-[30px]">
      <Input title="이메일" />
      <Input title="비밀번호" />
      <div className="mt-[50px] text-center flex flex-col gap-[30px] overflow-hidden">
        <LandingPageButton title="수련 시작" onClick={tempFunction} />
        <Link href="/sign-up">
          <LandingPageButton title="도장 등록" />
        </Link>
      </div>
    </form>
  );
}
