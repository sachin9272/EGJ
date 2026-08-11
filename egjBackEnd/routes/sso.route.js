import express from "express";
import jwt from "jsonwebtoken";

const ssoRouter = express.Router();

ssoRouter.get("/", (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ success: false, message: "Missing SSO token" });
  }

  try {
    const secret = process.env.SSO_SECRET;
    if (!secret) {
      throw new Error("SSO_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret);
    
    // In a real scenario, map this to Clerk or set a session token
    // For now, we return a success with the user context or redirect
    // Return a JWT or custom session that the frontend can use to bypass Clerk
    // Redirect to the frontend Admin Dashboard
    const frontendAdminUrl = process.env.FRONTEND_ADMIN_URL || "http://localhost:5173/admin";
    
    // We could set a cookie here or pass the token to frontend
    res.cookie("admin_sso_token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    res.redirect(frontendAdminUrl);
  } catch (error) {
    console.error("SSO Error:", error);
    res.status(401).json({ success: false, message: "Invalid SSO token" });
  }
});

export default ssoRouter;
