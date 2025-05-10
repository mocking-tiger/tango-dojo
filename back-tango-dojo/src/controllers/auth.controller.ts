import { AuthService } from "../services/auth.service";

export class AuthController {
  static signIn = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      const { user, token } = await AuthService.signIn(email, password);

      res.cookie("dojo-access-token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1일
        path: "/",
      });

      return res.status(200).send({ data: user });
    } catch (error: any) {
      res.status(401).send({ error });
    }
  };
}
