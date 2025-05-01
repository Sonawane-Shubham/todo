import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js"

export const register = async (req, res) => {
  const { name,email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User already exists",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ name,email, password: hashedPassword });

    res.status(201).json({
      status: true,
      statusCode: 201,
      message: "User registered",
    });
  } catch {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Registration error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user._id,name:user.name }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      status: true,
      statusCode: 200,
      message: "Login successful",
      data: {
        name:user.name,
        token,
    
      },
    });
  } catch {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Login error somthing went wrong",
    });
  }
};
