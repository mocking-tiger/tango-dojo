"use client";

import Image from "next/image";
import { N5WORDS } from "@/utils/mock-data";
import { useState } from "react";

export default function WordBox({ words }: { words: typeof N5WORDS }) {
  const [index, setIndex] = useState(0);
  console.log(words);
  return (
    <article className="w-[80%] h-[80%] bg-white rounded-[15px] relative">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-[36px] md:text-[72px]">{words[index].word}</h1>
      </div>
      {index !== 0 && (
        <Image
          className="absolute -left-[40px] md:-left-[60px] xl:-left-[75px] top-[47.5%] cursor-pointer"
          src={"/arrow-left.svg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "40px", height: "auto" }}
          alt="prev-arrow-icon"
          onClick={() => setIndex((prev) => prev - 1)}
        />
      )}
      {index !== words.length - 1 && (
        <Image
          className="absolute -right-[40px] md:-right-[60px] xl:-right-[75px] top-[47.5%] cursor-pointer"
          src={"/arrow-right.svg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "40px", height: "auto" }}
          alt="next-arrow-icon"
          onClick={() => setIndex((prev) => prev + 1)}
        />
      )}
      <div className="w-[25px] md:w-[50px] h-[25px] md:h-[50px] absolute right-[30px] md:right-[30px] top-[48.5%] md:top-[47.5%] cursor-pointer">
        <Image
          src={"/speaker.png"}
          fill
          alt="next-arrow-icon"
          onClick={() => {}}
        />
      </div>
      <aside className="text-[20px] font-yuji absolute -top-[50px] right-[40%] md:right-[47.5%]">{`${
        index + 1
      }/${words.length}`}</aside>
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden absolute right-[40%] md:right-[47.5%] cursor-pointer">
        <Image
          src={"/duel.png"}
          fill
          alt="duel-icon"
          title="겨루기(단어 시험)"
        />
      </div>
    </article>
  );
}
