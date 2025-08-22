import User from "../models/User.js"

// Update User CartData: /api/cart/update


export const updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { cartItems } = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({ success: true, messagae: "Cart Updated"})
    } catch (e) {
        console.log(e.messagae)
        res.json({success: false, messagae: e.messagae})
    }
}