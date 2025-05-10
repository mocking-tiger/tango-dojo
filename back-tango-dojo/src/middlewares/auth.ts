import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  // 예시: Authorization 헤더에서 토큰 검사 (단순 예시)
  const token = req.headers.authorization;

  if (!token || token !== "tango-dojo-auth-test") {
    res.status(401).json({ error: "인증 실패: 토큰 없음 또는 잘못됨" });
    return;
  }

  // 인증 통과 → 다음 미들웨어로 진행
  next();
};
