export type Level = "N5" | "N4" | "N3" | "N2" | "N1";

export interface Word {
  word: string;
  kana: string;
  mean: string;
  example: string;
  exampleKana: string;
  exampleMean: string;
  level: Level;
}
