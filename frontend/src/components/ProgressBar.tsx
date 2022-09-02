import { useState, useEffect } from "react";
import LinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
	return (
		<Box>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>

			<Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

// export default function LinearWithValueLabel() {
// 	const [progress, setProgress] = useState(10);

// 	useEffect(() => {
// 		setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
// 	}, []);

// 	return (
// 		<Box sx={{ width: "100%" }}>
// 			<LinearProgressWithLabel value={progress} />
// 		</Box>
// 	);
// }
