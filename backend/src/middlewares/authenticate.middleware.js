import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import userModel from "../models/user.model.js"

export const authenticateToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Token missing",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Invalid token",
      });

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({
      status: false,
      statusCode: 403,
      message: "Token verification failed",
    });
  }
};
