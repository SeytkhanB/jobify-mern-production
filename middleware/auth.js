import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "6369f47e69f914179b711135";

    // attach the user request object
    req.user = { userId: payload.userId, testUser };

    next(); // without next() user will be hanging
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
export default auth;
