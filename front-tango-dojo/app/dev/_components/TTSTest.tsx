"use client";

export default function TtsTest() {
  const TEXT = "愛あっての結婚生活でしょ？";
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(TEXT);
    utterance.lang = "ja-JP";
    utterance.rate = 0.7;
    utterance.pitch = 0.7;

    speechSynthesis.speak(utterance);
  };
  return (
    <div>
      <p>{TEXT}</p>
      <button onClick={speak}>듣기</button>
    </div>
  );
}
