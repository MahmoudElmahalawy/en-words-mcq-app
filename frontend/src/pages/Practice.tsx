import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";

import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

import WordService from "../services/word.service";

const Practice = () => {
	const choices: string[] = ["noun", "verb", "adjective", "adverb"];

	const [questions, setQuestions] = useState([]);
	const [userAnswers, setUserAnswers] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userScore, setUserScore] = useState(0);

	const navigate = useNavigate();

	const goToNextQuestion = () => {
		setCurrentQuestionIndex((currentQ) => currentQ + 1);
	};

	useEffect(() => {
		if (questions.length > 0 && currentQuestionIndex >= questions.length) {
			return navigate("/result", {
				replace: true,
				state: { userScore },
			});
		}
		setCurrentQuestion(questions[currentQuestionIndex]);
	}, [currentQuestionIndex]);

	useEffect(() => {
		WordService.getRandom().then((data) => {
			setCurrentQuestion(data?.data.words[0]);
			setQuestions(data?.data.words);
		});
	}, []);

	return (
		<>
			<Box sx={{ minWidth: 250, maxWidth: 750, margin: "5rem auto" }}>
				<ProgressBar value={(currentQuestionIndex * 100) / questions.length} />
			</Box>
			<QuestionCard
				question={currentQuestion}
				questionNo={currentQuestionIndex + 1}
				questionsCount={questions.length}
				goToNextQuestion={goToNextQuestion}
				choices={choices}
				setUserAnswers={setUserAnswers}
				setUserScore={setUserScore}
			/>
		</>
	);
};

export default Practice;
