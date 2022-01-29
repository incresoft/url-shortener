import { Router } from "express";
import Database from "#utils/manage-database";
import api from "./api";

const router = Router();

router.use("/api", api);

router.get("/:code", async (req, res) => {
    if (!req.params.code) {
        return;
    };

    const data = await Database.getURL(req.params.code);

    if (!data) {
        return;
    } else {
        res.redirect(data.Redirect);
    };
});

export default router;