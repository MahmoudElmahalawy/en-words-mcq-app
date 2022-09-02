import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import RankCard from "../components/RankCard";
import RankService from "../services/rank.service";

const Result = () => {
	const [rank, setRank] = useState(null);

	const navigate = useNavigate();
	const location: any = useLocation();

	useEffect(() => {
		if (!location.state) {
			navigate("/");
		} else {
			const { userScore = 0 } = location.state;
			RankService.getRank(userScore).then(({ data }: any) => setRank(data.rank));
		}
	}, []);

	return (
		<Box sx={{ textAlign: "center" }}>
			{rank !== null ? (
				<>
					<RankCard rank={rank} />
					<Button
						sx={{
							padding: "0.75rem",
							fontSize: "1.25em",
							textTransform: "capitalize",
							boxShadow: "none",
							fontWeight: "lighter",
							mb: 2,
						}}
						variant="contained"
						onClick={() => {
							navigate("/");
						}}
					>
						Try Again
					</Button>
				</>
			) : null}
		</Box>
	);
};

export default Result;
