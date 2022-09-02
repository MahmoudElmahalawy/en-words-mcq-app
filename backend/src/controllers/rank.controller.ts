import fs from "fs";
import { Request, Response } from "express";

const getRank = (req: Request, res: Response) => {
	const { score } = req.body;

	fs.readFile("data.json", "utf-8", (err, data) => {
		if (err) return res.status(500).json({ success: false, error: err });
		const { scoresList } = JSON.parse(data);

		const rank = +((scoresList.filter((s: number) => s < score).length / scoresList.length) * 100).toFixed(2);

		return res.status(200).json({ success: true, rank });
	});
};

export { getRank };
