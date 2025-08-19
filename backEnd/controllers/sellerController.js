import jwt from "jsonwebtoken";

// Login Seller: /api/seller/login

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL)
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true, // Prevent JS to access cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookie in production
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
      });
      return res.json({ success: true, message: "Logged In" });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (e) {
    console.log(e.message)
    res.json({success: false, message: e.message})
  }
};

// Seller Auth: /api/seller/is-auth
export const isSellerAuth = async (req,res) => {
    try {
        return res.json({success: true, user})
    } catch (e) {
        console.log(e.message)
        res.json({ success: false, massage: e.massage})
    }
}

// Logout Seller: /api/seller/logout
export const sellerLogOut = async (req,res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'prouduction' ? 'none' : 'strict',
        })
        return res.json({success: true, massage: "Logged Out"})
    }
    catch (e) {
        console.log(e.message)
        res.json({ success: false, massage: e.massage})
    }
}