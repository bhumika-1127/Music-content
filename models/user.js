import pool from '../config/db.js';
import bcrypt from 'bcrypt';

// Create a new user
export const createUser = async (username, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const queryText = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email;
  `;
  const values = [username, email, hashedPassword];

  const result = await pool.query(queryText, values);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const queryText = `
    SELECT id, username, email, password
    FROM users
    WHERE email = $1;
  `;
  const values = [email];

  const result = await pool.query(queryText, values);
  return result.rows[0];
};

// Check if username or email already exists
export const checkUserExists = async (username, email) => {
  const queryText = `
    SELECT COUNT(*)
    FROM users
    WHERE username = $1 OR email = $2;
  `;
  const values = [username, email];

  const result = await pool.query(queryText, values);
  return parseInt(result.rows[0].count, 10) > 0;
};
