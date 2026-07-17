import mongoose from "mongoose";
import noteSchema from "../model/note.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalNotes = await noteSchema.countDocuments();
    const memoryUsed = await mongoose.connection.db?.command({
      collStats: "notes",
    });
    const recentNotes = await noteSchema.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalNotes,
        memoryUsed: memoryUsed?.size || 0,
        recentNotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
