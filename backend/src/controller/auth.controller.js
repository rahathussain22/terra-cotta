import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input fields
  if (!username || !email || !password) {
    throw new APIError(400, "Name, email, and password are required.");
  }

  // Check if email or phone already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email: email }
      ]
    }
  });

  if (existingUser) {
    throw new APIError(409, "Email or phone already registered.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user (password hashing via hook)
  const newUser = await User.create({ 
    username, 
    email, 
    password: hashedPassword 
    
});

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    throw new APIError(400, "Username and password are required.");
  }

  // Check if user with the provided email exists
  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new APIError(404, "User not found");
  }

  // Compare the hashed password with the input password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new APIError(401, "Invalid username or password.");
  }

  // Generate refresh token
  const refreshtoken = user.generateRefreshToken();
  user.refreshtoken = refreshtoken;
  await user.save(); // Save the refresh token to the database

  // Respond with user data and the refresh token
  res.status(200).json({
    success: true,
    message: "Login successful.",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      refreshtoken: user.refreshtoken // Return the generated refresh token
    },
  });
});



export { registerUser, loginUser };
