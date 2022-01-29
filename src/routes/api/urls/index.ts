import { Router } from "express";
import Shorten from "./shorten";
const router = Router();

router.use("/shorten", Shorten);

export default router;