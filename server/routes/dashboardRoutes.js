import express from "express";
import { getTotalOrders, calculateTotalSales, calcualteTotalSalesByDate } from "../controllers/dashboardController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/total-orders', authenticate, authorizeAdmin, getTotalOrders);
router.get('/total-sales', authenticate, authorizeAdmin, calculateTotalSales);
router.get('/sales-by-date', authenticate, authorizeAdmin, calcualteTotalSalesByDate);

export default router;