"use client";

import Image from "next/image";
import { N5WORDS } from "@/utils/mock-data";
import { useEffect, useState } from "react";
import { shuffleArray } from "@/utils/shuffleArray";
import { TTS } from "@/utils/tts";

interface IMeanType {
  mean: string;
}

export default function WordBox({
  words,
  means,
}: {
  words: typeof N5WORDS;
  means: IMeanType[];
}) {
  const [shuffledArray, setShuffledArray] = useState([...words]);
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [isTest, setIsTest] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

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

  const handleNextQuestion = (option: string) => {
    setSelectedOption(option);
    if (option === shuffledArray[index].mean) {
      console.log("정답");
      setIsCorrect(true);
    } else {
      console.log("오답");
      setIsCorrect(false);
      setIsWrongAnswer(true);
    }
    setTimeout(() => {
      setSelectedOption("");
      if (index === words.length - 1) {
        if (isWrongAnswer) {
          // 패배 모달
        } else {
          // 승리 모달
        }
      } else {
        setIndex((prev) => prev + 1);
      }
    }, 1000);
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
      alert("시간제한은 없으며 한문제라도 오답시 실패입니다.");
      setShuffledArray(shuffleArray(shuffledArray));
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

  useEffect(() => {
    const correctAnswer = shuffledArray[index].mean;

    const wrongAnswers = shuffleArray(means)
      .filter((item: IMeanType) => item.mean !== correctAnswer)
      .slice(0, 3)
      .map((item: IMeanType) => item.mean);

    const newOptions = shuffleArray([correctAnswer, ...wrongAnswers]);
    setOptions(newOptions);
  }, [index, means, shuffledArray, isTest]);

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
        {isTest && (
          <div className="w-full px-[10px] md:px-[50px] absolute bottom-[150px]">
            <ul className="grid grid-cols-2 gap-[15px] text-[16px] md:text-[24px]">
              {options.map((option, index) => (
                <li
                  className={`py-[30px] flex justify-center items-center text-center border border-black rounded-[15px] ${
                    selectedOption !== "" ? "cursor-default" : "cursor-pointer"
                  } ${
                    option === selectedOption && isCorrect
                      ? "border-green-500"
                      : ""
                  } ${
                    option === selectedOption && !isCorrect
                      ? "border-red-500"
                      : ""
                  }`}
                  key={index}
                  onClick={() =>
                    selectedOption === "" && handleNextQuestion(option)
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
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
