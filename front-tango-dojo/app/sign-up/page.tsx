"use client";

import Container from "@/components/Container";
import Input from "@/components/Input";
import LandingPageButton from "@/components/LandingPageButton";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateCheckResultMessage, setDuplicateCheckResultMessage] =
    useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const checkEmailDuplicate = async () => {
    try {
      const response = await fetch(`api/check-email?email=${formData.email}`);
      console.log(response);
      if (response.status === 200) {
        return "ok";
      } else {
        return "no";
      }
    } catch (e) {
      console.error("Error: ", e);
      alert("서버 오류 발생");
      return "error";
    }
  };

  const tempSubmit = async (e: MouseEvent<HTMLFormElement>) => {
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

    if (duplicateCheckResultMessage !== "ok") {
      alert("이메일을 확인해주세요");
      return;
    }

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("회원가입 성공");
        router.push("/");
      } else {
        alert("회원가입 실패");
      }
    } catch (e) {
      console.error("Error: ", e);
    }
    // console.log(formData);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(formData.email)) {
      setIsLoading(true);
      const searchHandler = setTimeout(async () => {
        const DuplicateCheckResult = await checkEmailDuplicate();
        if (DuplicateCheckResult === "ok") {
          setDuplicateCheckResultMessage("ok");
        } else {
          setDuplicateCheckResultMessage("no");
        }
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(searchHandler);
    } else {
      setIsLoading(false);
    }
    // eslint의 경고가 항상 옳지는 않음., 지금 의존성 배열에 함수를 추가할 필요가 전혀 없음
    // eslint-disable-next-line
  }, [formData.email]);

  return (
    <Container>
      <div className="w-fit mx-auto">
        <form onSubmit={tempSubmit}>
          <h1 className="py-[100px] text-[36px] md:text-[50px] xl:text-[72px] text-center">
            입관원서
          </h1>
          <div className="flex flex-col gap-[30px] relative">
            <Input title="이메일" name="email" onChange={handleInputChange} />
            {isLoading && <div className="spinner absolute" />}
            {duplicateCheckResultMessage === "ok" && (
              <p className="text-green-700">가입이 가능한 이메일입니다.</p>
            )}
            {duplicateCheckResultMessage === "no" && (
              <p className="text-red-700">중복된 이메일입니다.</p>
            )}
            {duplicateCheckResultMessage === "error" && (
              <p className="text-red-700">
                서버 오류 발생. 다시 시도해 주세요.
              </p>
            )}
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
              minLength={6}
              onChange={handleInputChange}
            />
            <Input
              title="비밀번호 확인"
              name="confirmPassword"
              maxLength={15}
              minLength={6}
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
