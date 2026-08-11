import express from "express";
import Booking from "../models/booking.model.js";

const masterStatsRouter = express.Router();

masterStatsRouter.get("/", async (req, res) => {
  const apiKey = req.headers["x-master-api-key"] || req.query.apiKey;

  if (apiKey !== process.env.MASTER_API_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const totalTransactions = await Booking.countDocuments();
    
    const revenueResult = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalCost" },
        }
      }
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const stats = {
      project: "EGJ",
      totalUsers: 340, // Keeping other mock stats if any are used, but we'll return actual transactions/revenue
      activeSessions: 42,
      recentRegistrations: 5,
      totalTransactions: totalTransactions,
      totalRevenue: totalRevenue,
      status: "healthy",
      lastUpdated: new Date().toISOString()
    };

    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Stats fetch error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default masterStatsRouter;
