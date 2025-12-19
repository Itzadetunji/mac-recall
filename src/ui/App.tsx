import { Route, HashRouter as Router, Routes } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import MainPage from "./pages/MainPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<MainPage />}
				/>
				<Route
					path="/gallery"
					element={<GalleryPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
