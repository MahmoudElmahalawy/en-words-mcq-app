import express from "express";
import { getRank } from "../controllers/rank.controller";

const router = express.Router();

router.post("/", getRank);

export default router;
