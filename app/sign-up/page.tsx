"use client";

import Container from "@/components/Container";
import Input from "@/components/Input";
import LandingPageButton from "@/components/LandingPageButton";
import { MouseEvent, useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const tempSubmit = (e: MouseEvent<HTMLFormElement>) => {
    // const target = e.target as HTMLButtonElement;
    // console.log(target.name);
    e.preventDefault();
    // if (Object.values(formData).includes("")) {
    //   alert("빈칸 채워주세요");
    //   return;
    // }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호 불일치");
      return;
    }
    console.log(formData);
  };

  const handleInputChange = (title: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  return (
    <Container>
      <div className="w-fit mx-auto">
        <form onSubmit={tempSubmit}>
          <h1 className="py-[100px] text-[36px] md:text-[50px] xl:text-[72px] text-center">
            입관원서
          </h1>
          <div className="flex flex-col gap-[30px]">
            <Input title="이메일" name="email" onChange={handleInputChange} />
            <Input
              title="이름"
              name="name"
              maxLength={15}
              onChange={handleInputChange}
            />
            <Input
              title="비밀번호"
              name="password"
              maxLength={15}
              onChange={handleInputChange}
            />
            <Input
              title="비밀번호 확인"
              name="confirmPassword"
              maxLength={15}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-fit mx-auto my-[100px]">
            <LandingPageButton title="입문" />
          </div>
        </form>
      </div>
    </Container>
  );
}
