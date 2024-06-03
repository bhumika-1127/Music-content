import { getAllPosts } from '../models/post.js';

// Get posts controller
export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch posts. Please try again later.' });
  }
};
