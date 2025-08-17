import express from 'express'
import { isSellerAuth, sellerLogin, sellerLogOut } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin)
sellerRouter.get('/login',authSeller, isSellerAuth)
sellerRouter.get('/logout', sellerLogOut)

export default sellerRouter;