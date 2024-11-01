import jwt from "jsonwebtoken";

export function signToken(userId: string) {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET || "default_secret",
    {
      expiresIn: "1h",
    }
  );
  return token;
}

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
