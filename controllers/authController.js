import { createUser, findUserByEmail, checkUserExists } from '../models/user.js';

// Signup controller
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await checkUserExists(username, email);
    if (userExists) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }

    // Create a new user
    const newUser = await createUser(username, email, password);
    res.json({ message: 'Signup successful!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }
};
