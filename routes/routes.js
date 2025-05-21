import express from "express";
import { afterAuth, login, logout, signup } from "../controllers/controller.js";
import {auth} from '../middleware/middleware.js';
const router= express.Router()


router.post('/signup',signup)
router.post('/logout',auth,logout)
router.get('/checkauth',auth,afterAuth)
router.post('/login',login)



export default router