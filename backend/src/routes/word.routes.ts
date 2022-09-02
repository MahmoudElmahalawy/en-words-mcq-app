import express from "express";
import {
	getAllWords,
	getRandomWords,
	getWordById,
	addNewWord,
	editWord,
	deleteWord,
} from "../controllers/word.controller";

const router = express.Router();

router.get("/", getAllWords);

router.get("/random", getRandomWords);

router.get("/:id", getWordById);

router.post("/", addNewWord);

router.put("/:id", editWord);

router.delete("/:id", deleteWord);

export default router;
