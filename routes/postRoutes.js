import express from 'express';
const router = express.Router();
import { getPosts } from '../controllers/postController.js';

router.get('/posts', getPosts);

export default router;
