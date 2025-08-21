import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

// Register User: /api/user/register
export const register = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email|| !password) {
            return res.json({success: false, message: 'Missing Details'})
        }

        const existingUser = await User.findOne({email})

        if (existingUser) return res.json({success: false, message: 'User already exists'})
        
        const hasdedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hasdedPassword})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true, // Prevent JS to access cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success: true, user: {email: user.email, name: user.name},message: 'User have been created'})
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message})
    }
}

// Login User: /api/user/login

export const login = async (req,res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) return res.json({success: false, message: 'Email and password are required'})
        const user = await User.findOne({email})
        
        if (!user) {
           return res.json({success: false, message: 'Invalid email or password'})
        }
        const isMatch = await bcrypt.compare(password, user.password) 

        if (!isMatch) return res.json({success: false, message: 'Invalid email or password'})

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie('token', token, {
            httpOnly: true, // Prevent JS to access cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })

        return res.json({success: true, user: {email: user.email, name: user.name}, message: "Login successfully"})
    }
    catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message})
    }
}

// Check Auth: /api/user/is-auth
export const isAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password")
        return res.json({success: true, user})
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message})
    }
}

// Logout User: /api/user/logout
export const logOut = async (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prouduction' ? 'none' : 'strict',
        })
        return res.json({success: true, message: "Logged Out"})
    }
    catch (e) {
        console.log(e.message)
        res.json({ success: false, message: e.message})
    }
}