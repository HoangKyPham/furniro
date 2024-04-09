import express from 'express';
import { register, signin } from '../controllers/user';

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", signin);
router.get("/auth/test", (req, res) => {
    res.send("test")
});


export default router