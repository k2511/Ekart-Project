import express from "express";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import {
  createOrder,
  getAllOrdersAdmin,
  getMyOrders,
  getUserOrders,
  verifyPayment,
} from "../controllers/orrderControler.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.post("/verify-payment", isAuthenticated, verifyPayment);
router.get("/myorder", isAuthenticated, getMyOrders);
router.get("/all", isAuthenticated, isAdmin, getAllOrdersAdmin);
router.get("/user-order/:userId", isAuthenticated, isAdmin, getUserOrders);

export default router;
