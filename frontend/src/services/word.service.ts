import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}words/`;

const WordService = {
	async getAll() {
		try {
			const response = await axios.get(`${API_URL}`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async getRandom() {
		try {
			const response = await axios.get(`${API_URL}random`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async getById(id: string) {
		try {
			const response = await axios.get(`${API_URL}${id}`);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async post(data: any) {
		try {
			const response = await axios.post(API_URL, data);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async update(id: string, data: any) {
		try {
			const response = await axios.put(`${API_URL}${id}`, data);
			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async delete(id: string) {
		try {
			await axios.delete(`${API_URL}${id}`);
		} catch (error) {
			console.error(error);
		}
	},
};

export default WordService;
