import express from 'express'
import { addAddress, getAddresss } from '../controllers/addressController';
import authUser from '../middlewares/authUser.js';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress)
addressRouter.post('/get', authUser, getAddresss)

export default addressRouter