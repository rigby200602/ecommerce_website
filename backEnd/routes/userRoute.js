import express from 'express';
import { isAuth, login, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/login', authUser ,isAuth)

export default userRouter