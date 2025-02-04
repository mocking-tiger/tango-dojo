"use client";

import Container from "@/components/Container";
import Input from "@/components/Input";
import LandingPageButton from "@/components/LandingPageButton";
import { MouseEvent } from "react";

export default function SignUp() {
  const tempFunction = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    console.log(target.name);
  };

  return (
    <Container>
      <div className="w-fit mx-auto">
        <form>
          <h1 className="py-[100px] text-[36px] md:text-[50px] xl:text-[72px] text-center">
            입관원서
          </h1>
          <div className="flex flex-col gap-[30px]">
            <Input title="이메일" />
            <Input title="이름" />
            <Input title="비밀번호" />
            <Input title="비밀번호 확인" />
          </div>
          <div className="w-fit mx-auto my-[100px]">
            <LandingPageButton title="입문" onClick={tempFunction} />
          </div>
        </form>
      </div>
    </Container>
  );
}
