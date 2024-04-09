import { Router } from "express";
import { createOrder, getOrderById, getOrderByUserId, getOrders } from "../controllers/oder"

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:orderId", getOrderById);
router.get("/orders/user/:userId", getOrderByUserId);
export default router;