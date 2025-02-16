"use client";

import Image from "next/image";
import { N5WORDS } from "@/utils/mock-data";
import { useEffect, useState } from "react";

export default function WordBox({ words }: { words: typeof N5WORDS }) {
  const [shuffledArray, setShuffledArray] = useState(
    [...words].sort(() => Math.random() - 0.5)
  );
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [isTest, setIsTest] = useState(false);

  console.log(shuffledArray);

  const TTS = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    utterance.rate = 0.5;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  };

  const handleNextWord = (direction: "next" | "prev") => {
    setIsSelected(false);
    setTimeout(() => {
      if (direction === "next") {
        setIndex((prev) => prev + 1);
      } else {
        setIndex((prev) => prev - 1);
      }
    }, 100);
  };

  const handleTest = () => {
    if (isTest) {
      const stopTest = confirm(
        "진행상황이 저장되지 않습니다. 정말 대련을 중단하시겠습니까?"
      );
      if (stopTest) {
        setIsTest(false);
      }
    } else {
      setShuffledArray(shuffledArray.sort(() => Math.random() - 0.5));
      setIsTest(true);
    }
    setIsSelected(false);
    setIndex(0);
  };

  useEffect(() => {
    const keyDown = (e: globalThis.KeyboardEvent) => {
      if (!isTest) {
        if (e.key === "ArrowRight" && index < words.length - 1) {
          handleNextWord("next");
        } else if (e.key === "ArrowLeft" && index !== 0) {
          handleNextWord("prev");
        } else if (e.key === "Enter") {
          setIsSelected((prev) => !prev);
        } else if (e.key === " " && isSelected === false) {
          console.log(isSelected);
          TTS(words[index].kana);
        } else if (e.key === " " && isSelected === true) {
          console.log(isSelected);
          TTS(words[index].exampleKana);
        }
      }
    };

    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
    // eslint-disable-next-line
  }, [index, isSelected, isTest]);

  // console.log(words);
  return (
    <article className="w-[80%] h-[80%] bg-white rounded-[15px] relative">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1
          className={`text-[36px] md:text-[72px] relative ${
            isTest ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={() => !isTest && setIsSelected((prev) => !prev)}
        >
          {isTest ? shuffledArray[index].word : words[index].word}
          <div className="w-[25px] md:w-[50px] h-[25px] md:h-[50px] absolute -right-[50px] md:-right-[130px] xl:-right-[210px] top-[15px] md:top-[30px] cursor-pointer">
            <Image
              src={"/speaker.png"}
              fill
              sizes="50px"
              alt="next-arrow-icon"
              onClick={(e) => {
                e.stopPropagation();
                (() =>
                  isTest
                    ? TTS(shuffledArray[index].kana)
                    : TTS(words[index].kana))();
              }}
            />
          </div>
        </h1>
        <div
          className={`px-[50px] md:px-0 flex flex-col justify-center items-center transition-all ease-in-out ${
            isSelected ? "scale-100" : "scale-0"
          }`}
        >
          <h2 className="text-[24px] md:text-[36px]">{words[index].kana}</h2>
          <h2 className="mb-[60px] text-[24px] md:text-[36px]">
            {words[index].mean}
          </h2>
          <div className="relative text-center">
            <h2 className="text-[20px] md:text-[24px]">
              {words[index].example}
            </h2>
            <h2 className="text-[20px] md:text-[24px]">
              {words[index].exampleMean}
            </h2>
            <div className="w-[25px] md:w-[50px] h-[25px] md:h-[50px] absolute -right-[30px] md:-right-[100px] top-[20%] md:top-[15%] cursor-pointer">
              <Image
                src={"/speaker.png"}
                fill
                sizes="50px"
                alt="next-arrow-icon"
                onClick={() => TTS(words[index].exampleKana)}
              />
            </div>
          </div>
        </div>
      </div>
      {index !== 0 && !isTest && (
        <Image
          className="absolute -left-[40px] md:-left-[60px] xl:-left-[75px] top-[47.5%] cursor-pointer"
          src={"/arrow-left.svg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "40px", height: "auto" }}
          alt="prev-arrow-icon"
          onClick={() => handleNextWord("prev")}
        />
      )}
      {index !== words.length - 1 && !isTest && (
        <Image
          className="absolute -right-[40px] md:-right-[60px] xl:-right-[75px] top-[47.5%] cursor-pointer"
          src={"/arrow-right.svg"}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "40px", height: "auto" }}
          alt="next-arrow-icon"
          onClick={() => handleNextWord("next")}
        />
      )}

      <aside className="text-[20px] font-yuji absolute -top-[50px] right-[40%] md:right-[47.5%]">{`${
        index + 1
      }/${words.length}`}</aside>
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden absolute right-[40%] md:right-[47.5%] cursor-pointer">
        <Image
          src={"/duel.png"}
          fill
          sizes="70px"
          alt="duel-icon"
          title="대련(단어 시험)"
          onClick={handleTest}
        />
      </div>
    </article>
  );
}
