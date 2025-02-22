export const TTS = (word: string) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "ja-JP";
  utterance.rate = 0.5;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
};
