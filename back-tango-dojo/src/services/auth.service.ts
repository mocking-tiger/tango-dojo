import db from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const SECRET_KEY = process.env.JWT_SECRET;

export class AuthService {
  static signIn = async (email: string, password: string) => {
    const user = await db.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  };
}
