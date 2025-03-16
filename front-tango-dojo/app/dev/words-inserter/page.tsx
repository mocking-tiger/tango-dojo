"use client";

import { useState } from "react";

interface Word {
  word: string;
  kana: string;
  mean: string;
  example: string;
  exampleKana: string;
  exampleMean: string;
}

const initialState = {
  word: "",
  kana: "",
  mean: "",
  example: "",
  exampleKana: "",
  exampleMean: "",
};

export default function WordInserter() {
  const [newWord, setNewWord] = useState<Word>(initialState);
  const [words, setWords] = useState<Word[]>([]);

  // 단어리스트 db에 추가
  const handleAddWord = async (words: Word[]) => {
    console.log(words);

    const response = await fetch("http://localhost:5000/api/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ words }),
    });

    console.log(response);
  };

  const handleAddWordToList = () => {
    setWords((prev) => [...prev, newWord]);
  };

  return (
    <div>
      <div className="w-fit flex flex-col gap-3 border border-black">
        <label>WORD</label>
        <input
          className="w-[600px] p-3 border border-black"
          value={newWord?.word}
          onChange={(e) =>
            setNewWord((prev) => ({ ...prev, word: e.target.value }))
          }
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
            console.log("버튼 클릭");
            handleAddWordToList();
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
