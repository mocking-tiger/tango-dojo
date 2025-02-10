"use client";

import { N5WORDS } from "@/utils/mock-data";
import { useRouter } from "next/navigation";

export default function ChapterBox({
  // words,
  index,
}: {
  words: typeof N5WORDS;
  index: number;
}) {
  const router = useRouter();
  // console.log(words);
  return (
    <article
      className="p-[20px] md:p-[50px] xl:p-[120px] flex justify-center items-center bg-white rounded-[15px] font-yuji cursor-pointer shadow-lg hover:-translate-y-3 transition-all ease-in-out"
      onClick={() => router.push(`/dashboard/n5/${index + 1}`)}
    >
      <span className="text-[20px] md:text-[36px] xl:text-[48px]">
        第{index + 1}歩
      </span>
    </article>
  );
}
