import { Router } from "express";
import URLs from "./urls";
const router = Router();


router.use("/urls", URLs);

router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Henlo Developer!"
    });
});

export default router;