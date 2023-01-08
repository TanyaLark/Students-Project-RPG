import * as jwt from 'jsonwebtoken';

export function generateJwtToken(user: {
  email: string,
  id: string
}) {
  const today = new Date();
  const exp = new Date(today);
  exp.setTime(today.getTime() + 24 * 7 * 60 * 60 * 1000);
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      exp: Math.floor(exp.getTime() / 1000),
    },
    jwtSecret,
  );
  return {
    exp: exp,
    token: token,
  };
}
