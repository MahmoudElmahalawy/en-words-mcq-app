import express, { Application, Request, Response, NextFunction, Errback } from "express";
import morgan from "morgan";
import cors from "cors";

//importing environment variables
require("dotenv/config");

//importing routes
import wordRoutes from "./routes/word.routes";
import rankRoutes from "./routes/rank.routes";

const app: Application = express();

//api prefix
const API = process.env.API_URL;
const PORT = process.env.PORT || 8080;

app.use(cors());
app.options("*", cors<Request>());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
	res.send(err);
});

//routes
app.use(`${API}/words`, wordRoutes);
app.use(`${API}/rank`, rankRoutes);

//starting the server
app.listen(PORT, () => {
	console.log(`Server is up and running at http://localhost:${PORT}/`);
});
