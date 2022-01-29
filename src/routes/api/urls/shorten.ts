import { Router, Request, Response } from "express";
import Validator from "validator";
import Database from "#utils/manage-database";
const router = Router();

type methods = "get" | "patch" | "put" | "delete";

["get", "patch", "put", "delete"].forEach((x: methods) => {
    router[x]("/", (req: Request, res: Response) => {
        return res.status(405).json({
            success: false,
            message: "Method is not allowed"
        });
    });
});

router.post("/", async (req, res) => {
    const { redirect } = req.query;

    if (!redirect) {
        return res.status(400).json({
            success: false,
            message: "Redirect url is needed"
        });
    };

    if (!Validator.isURL(redirect as string)) {
        return res.status(400).json({
            success: false,
            message: "The redirect url is not valid"
        });
    };

    const url = await Database.createURL(redirect as string);

    if (url) {
        return res.status(200).json({
            success: true,
            url: `${process.env.MAIN_URL}/${url}`,
            code: String(url)
        });
    } else {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating your shorten url"
        });
    };
});

export default router;