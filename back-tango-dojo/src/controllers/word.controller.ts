import { Request, Response } from "express";
import WordService from "../services/word.service";

export class WordController {
  static insertWords = async (req: any, res: any) => {
    try {
      const newWords = req.body;

      const data = await WordService.insertWords(newWords);

      return res.status(201).send({ data });
    } catch (error: any) {
      res.status(500).send({ error: "단어 삽입 실패" });
    }
  };
}
