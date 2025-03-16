import { Request, Response } from "express";
import WordService from "../services/word.service";
import db from "../lib/db";

export class WordController {
  static insertWords = async (req: any, res: any) => {
    try {
      const newWords = req.body;

      const data = await db.$transaction(async (tx) => {
        for (let newWord of newWords) {
          await WordService.insertWords(newWord, tx);
        }
      });

      return res.status(201).send({ data });
    } catch (error: any) {
      res.status(500).send({ error });
    }
  };
}
