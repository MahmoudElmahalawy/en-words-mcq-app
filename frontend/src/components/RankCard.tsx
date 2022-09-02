import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface RankCardProps {
	rank: number;
}

const RankCard = ({ rank }: RankCardProps) => {
	return (
		<Card sx={{ maxWidth: 345, margin: "5rem auto", padding: "3rem" }} variant="outlined">
			<CardContent sx={{ textAlign: "center" }}>
				<Typography gutterBottom variant="h6" component="div">
					Your rank across your peers
				</Typography>
				<Typography gutterBottom variant="h3" component="div">
					{rank}%
				</Typography>
			</CardContent>
		</Card>
	);
};

export default RankCard;
