import { useState, useEffect, forwardRef } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const FEEDBACK_SHOWN_TIME = 2000;

interface Word {
	id: number;
	word: string;
	pos: "adjective" | "adverb" | "noun" | "verb";
}

interface UserAnswer {
	wordId?: number;
	answer?: string;
}

interface QuestionCardProps {
	questions?: Array<any>;
	question?: Word | null;
	questionNo: number;
	questionsCount: number;
	choices: string[];
	goToNextQuestion: any;
	setUserAnswers: any;
	setUserScore: any;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props: any, ref: any) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QuestionCard = ({
	question,
	questionNo,
	questionsCount,
	choices,
	goToNextQuestion,
	setUserAnswers,
	setUserScore,
}: QuestionCardProps) => {
	const [radioValue, setRadioValue] = useState("");
	const [userAnswer, setUserAnswer] = useState({});
	const [feedback, setFeedback] = useState({ show: false, message: "" });

	const handleAnswerSelect = (e: any) => {
		setRadioValue(e.target.value);
		setUserAnswer({ questionId: question?.id, userAnswer: e.target.value });
	};

	const showFeedback = (message: string) => {
		setFeedback({ show: true, message });
	};

	const hideFeedback = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setFeedback({ show: false, message: feedback.message });
	};

	useEffect(() => {
		setRadioValue("");
	}, [question]);
	return (
		<Box sx={{ minWidth: 275, maxWidth: 750, margin: "5rem auto" }}>
			{question && (
				<Card variant="outlined">
					<CardContent>
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
							Q. No {questionNo}
						</Typography>
						<Typography variant="h5" component="div" sx={{ mb: 1.5, mt: 1.5 }}>
							"{question.word}" is a/an ..
						</Typography>

						<FormControl sx={{ paddingLeft: 5 }}>
							<RadioGroup
								value={radioValue}
								name={`question-${questionNo}`}
								onChange={handleAnswerSelect}
							>
								{choices.map((choice) => (
									<FormControlLabel key={choice} value={choice} control={<Radio />} label={choice} />
								))}
							</RadioGroup>
						</FormControl>
					</CardContent>
					<CardActions>
						<Button
							size="medium"
							sx={{ marginLeft: "auto" }}
							disabled={!radioValue}
							onClick={() => {
								if (radioValue !== question.pos) {
									showFeedback("Wrong answer");
								} else {
									setUserScore((score: number) => score + 10);
									showFeedback("Correct");
								}
								setRadioValue("");
								setUserAnswers((oldState: UserAnswer[]) => [...oldState, userAnswer]);

								setTimeout(() => goToNextQuestion(), FEEDBACK_SHOWN_TIME);
							}}
						>
							{questionNo === questionsCount ? "Submit & Finish" : "Submit & Next"}
						</Button>
					</CardActions>
				</Card>
			)}
			<Snackbar open={feedback.show} autoHideDuration={FEEDBACK_SHOWN_TIME} onClose={hideFeedback}>
				<Alert
					onClose={hideFeedback}
					severity={feedback.message === "Wrong answer" ? "error" : "success"}
					sx={{ width: "100%" }}
				>
					{feedback.message}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default QuestionCard;
