import { getDashboardData } from "../controller/adminController.js";
import express from "express";

const router = express.Router();

router.get("/dashboard", getDashboardData);

export default router;
