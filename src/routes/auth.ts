import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user ) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
  res.json({ token });
});

export default router;