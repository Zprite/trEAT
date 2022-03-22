import express from 'express';
import { verifyUser } from '../authenticate';
import upload from '../utils/storage';

const router = express.Router();

router.post(
  '/imageUpload',
  verifyUser,
  upload.single('file'),
  async (req, res) => {
    const imagePath = `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;
    console.log('storage location of file upload: ', imagePath);
    return res.send(imagePath);
  },
);

export default router;
