import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Henlo Developer!"
    });
});

export default router;