"use client";

import { Level, Word } from "@/types/type";
import { useEffect, useRef, useState } from "react";

const initialState: Word = {
  word: "",
  kana: "",
  mean: "",
  example: "",
  exampleKana: "",
  exampleMean: "",
  level: "N5",
};

export default function WordInserter() {
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const [newWord, setNewWord] = useState<Word>(initialState);
  const [words, setWords] = useState<Word[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Level>(initialState.level);

  useEffect(() => {
    setNewWord({ ...newWord, level: selectedLevel });
    // eslint-disable-next-line
  }, [selectedLevel]);

  // 단어리스트 db에 추가
  const handleAddWord = async (words: Word[]) => {
    const response = await fetch("http://localhost:5001/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer " + localStorage.getItem("token"),
        Authorization: "tango-dojo-auth-test",
      },
      credentials: "include",
      body: JSON.stringify(words),
    });

    const data = await response.json(); // ✅ json 파싱이 필요
    console.log(data.data);
  };

  // db에 삽입할 배열에 단어 추가
  const handleAddWordToList = () => {
    setWords((prev) => [...prev, newWord]);

    setNewWord((prev) => ({
      word: "",
      kana: "",
      mean: "",
      example: "",
      exampleKana: "",
      exampleMean: "",
      level: prev.level,
    }));
  };

  return (
    <div className="p-3">
      <select
        className="m-10 p-3 border border-black"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value as Level)}
      >
        <option>N5</option>
        <option>N4</option>
        <option>N3</option>
        <option>N2</option>
        <option>N1</option>
      </select>
      <div className="w-fit flex flex-col gap-3 border border-black">
        <label>WORD</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.word}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, word: e.target.value }))
          }
          ref={firstInputRef}
        />
        <label>KANA</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.kana}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, kana: e.target.value }))
          }
        />
        <label>MEAN</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.mean}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, mean: e.target.value }))
          }
        />
        <label>EXAMPLE</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.example}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, example: e.target.value }))
          }
        />
        <label>EXAMPLE KANA</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.exampleKana}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, exampleKana: e.target.value }))
          }
        />
        <label>EXAMPLE MEAN</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.exampleMean}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, exampleMean: e.target.value }))
          }
        />
        <button
          className="w-fit p-5 border border-black"
          onClick={() => {
            console.log("리스트에 추가됨");
            handleAddWordToList();
            firstInputRef.current?.focus();
          }}
        >
          리스트에 추가
        </button>
      </div>

      <div>
        <h1>삽입 리스트</h1>
        <div className="flex flex-wrap gap-3 border border-black">
          {words.map((word, index) => (
            <ul
              key={index}
              className="w-fit flex flex-col gap-2 border border-black"
            >
              <li>{word.word}</li>
              <li>{word.kana}</li>
              <li>{word.mean}</li>
              <li>{word.example}</li>
              <li>{word.exampleKana}</li>
              <li>{word.exampleMean}</li>
            </ul>
          ))}
        </div>
        <button
          className="w-fit mt-20 p-5 border border-black"
          onClick={() => handleAddWord(words)}
        >
          db 삽입
        </button>
      </div>
    </div>
  );
}
