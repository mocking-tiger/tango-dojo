import pool from "@/lib/db";
import { N5WORDS } from "@/utils/mock-data";

const insertWords = async () => {
  const connection = await pool.getConnection();
  try {
    // 트랜잭션 시작
    await connection.beginTransaction();

    const sql = `
      INSERT INTO words (
        word,
        kana,
        mean,
        example,
        exampleKana,
        exampleMean,
        level
      ) VALUES (?, ?, ?, ?, ?, ?, 'N5')
    `;

    // 데이터 삽입
    for (const word of N5WORDS) {
      await connection.execute(sql, [
        word.word,
        word.kana,
        word.mean,
        word.example,
        word.exampleKana,
        word.exampleMean,
      ]);
    }

    await connection.commit();
    console.log("데이터 삽입 완료");
  } catch (error) {
    await connection.rollback();
    console.error("테이터 삽입 실패", error);
  } finally {
    connection.release();
  }
};

insertWords();
