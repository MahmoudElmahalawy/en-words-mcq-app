import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/Home";
import PracticePage from "./pages/Practice";
import ResultPage from "./pages/Result";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/home" />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/practice" element={<PracticePage />} />
				<Route path="/result" element={<ResultPage />} />
				<Route path="*" element={<Navigate to="/home" />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
