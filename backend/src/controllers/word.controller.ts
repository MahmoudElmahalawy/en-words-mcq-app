import fs from "fs";
import { Request, Response } from "express";

import { IWord } from "../interfaces/word.interface";

const getAllWords = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);

		return res.status(200).json({ success: true, words });
	});
};

const getRandomWords = (req: Request, res: Response) => {
	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);
		const listCopy = [...words];
		let randomWordsList = [];
		let wordChecklist = {
			adjective: false,
			adverb: false,
			noun: false,
			verb: false,
		};

		while (randomWordsList.length < 10) {
			const randomIndex = Math.floor(Math.random() * listCopy.length);
			const randomWord: IWord = listCopy[randomIndex];

			// ** Making sure that first 4 words will be 1 adjective & 1 adverb & 1 noun & 1 verb
			if (
				(randomWordsList.length < 4 && wordChecklist[randomWord.pos] === false) ||
				randomWordsList.length >= 4
			) {
				randomWordsList.push(randomWord);
				wordChecklist[randomWord.pos] = true;
				listCopy.splice(randomIndex, 1);
			}
		}

		return res.status(200).json({ success: true, words: randomWordsList });
	});
};

const getWordById = (req: Request, res: Response) => {
	const { id } = req.params;

	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);
		const word = words.find((t: IWord) => t.id === +id);

		if (!word) return res.status(404).json({ success: false, error: "Word not found" });

		return res.status(200).json({ success: true, word });
	});
};

const addNewWord = (req: Request, res: Response) => {
	const { word, pos } = req.body;

	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);
		const id = +Date.now().toString().substring(10);

		words.push({ id, word, pos });

		updateFile(words, res);
	});
};

const editWord = (req: Request, res: Response) => {
	const { id } = req.params;
	const { word, pos } = req.body;

	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);
		const wordIndex = words.findIndex((t: IWord) => t.id === +id);

		if (wordIndex === -1) return res.status(404).json({ success: false, error: "Word not found" });

		if (word) words[wordIndex].word = word;
		if (pos) words[wordIndex].pos = pos;

		updateFile(words, res);
	});
};

const deleteWord = (req: Request, res: Response) => {
	const { id } = req.params;

	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { wordList: words } = JSON.parse(data);
		const newWords = words.filter((t: IWord) => t.id !== +id);

		updateFile(newWords, res);
	});
};

function updateFile(newData: IWord[], res: Response) {
	fs.writeFile("data.json", JSON.stringify(newData, null, 2), "utf8", (err) => {
		if (err) return res.status(500).json({ success: false, error: err });

		return res.status(204).end();
	});
}

export { getAllWords, getRandomWords, getWordById, addNewWord, editWord, deleteWord };
