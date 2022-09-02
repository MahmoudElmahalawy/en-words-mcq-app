import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";

function Home() {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const goToPractice = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate("/practice");
		}, 500);
	};

	return (
		<form>
			<Card sx={{ maxWidth: 500, margin: "5rem auto", border: "1px solid #7772" }} variant="outlined">
				<CardContent>
					<Box
						sx={{
							backgroundColor: "#EEE9",
							textAlign: "center",
							borderRadius: "5px 5px 0 0",
							padding: 2,
							marginBottom: "1rem",
						}}
					>
						<Typography sx={{ fontWeight: "bold" }} gutterBottom>
							Welcome to English Words Practice
						</Typography>
						<Typography color="textSecondary">Click the button to start</Typography>
					</Box>
				</CardContent>
				<CardActions>
					<LoadingButton
						sx={{
							padding: "0.75rem",
							fontSize: "1.25em",
							textTransform: "capitalize",
							boxShadow: "none",
							fontWeight: "lighter",
							mb: 2,
						}}
						fullWidth
						variant="contained"
						loading={loading}
						onClick={goToPractice}
					>
						Start Practice
					</LoadingButton>
				</CardActions>
			</Card>
		</form>
	);
}

export default Home;
