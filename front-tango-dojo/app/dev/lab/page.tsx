"use client";

import { useAlert } from "@/hooks/useAlert";
import ApiTest from "../_components/ApiTest";
import TtsTest from "../_components/TtsTest";
import { useState } from "react";

export default function Laboratory() {
  const { show } = useAlert();
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

  const deleteNum = (num: number, idx?: number) => {
    if (idx) {
      show(`${idx}을 정말 삭제하시겠습니까?`, "confirm", () => deleteNum(num));
      return;
    }

    setArray(array.filter((_num) => _num !== num));
  };

  return (
    <div>
      {/* <TtsTest /> */}
      {/* <ApiTest /> */}
      {array.map((num, idx) => (
        <div
          key={idx}
          className="w-32 p-5 border cursor-pointer text-center"
          onClick={() => deleteNum(num, idx + 1)}
        >
          {num} 삭제하기
        </div>
      ))}
    </div>
  );
}
