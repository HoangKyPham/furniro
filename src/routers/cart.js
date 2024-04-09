import {Router } from "express";
import { addItemCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateProductQuantity } from "../controllers/cart";


const router = Router();

router.get("/carts/:userId", getCartByUserId);
router.post("/carts/add-to-cart", addItemCart);
router.post("/carts/remove-from-cart", removeFromCart);
router.post("/carts/update", updateProductQuantity);
router.post("/carts/increase", increaseProductQuantity);
router.post("/carts/decrease", decreaseProductQuantity);
export default router;


