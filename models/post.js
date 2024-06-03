import pool from '../config/db.js';

// Get all posts
export const getAllPosts = async () => {
  const queryText = `
    SELECT id, title, content
    FROM posts;
  `;

  const result = await pool.query(queryText);
  return result.rows;
};
