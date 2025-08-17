import express from 'express';
import { isAuth, login, logOut, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/login', authUser ,isAuth)
userRouter.get('/logout', authUser, logOut)

export default userRouter