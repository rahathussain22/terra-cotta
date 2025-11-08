import { registerUser } from "../../src/controller/auth.controller.js";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Call the register controller function
      await registerUser(req, res);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' }); // Handle non-POST requests
  }
}