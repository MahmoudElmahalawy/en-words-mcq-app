import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}rank/`;

const RankService = {
	async getRank(score: number) {
		try {
			const response = await axios.post(`${API_URL}`, { score });
			return response;
		} catch (error) {
			console.error(error);
		}
	},
};

export default RankService;
