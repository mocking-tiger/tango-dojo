import db from "../lib/db";
import { Prisma, Word } from "@prisma/client";

export default class WordService {
  static insertWords = async (newWord: Word, tx?: Prisma.TransactionClient) => {
    const _db = tx ?? db;

    return await _db.word.create({
      data: newWord,
    });
  };
}
