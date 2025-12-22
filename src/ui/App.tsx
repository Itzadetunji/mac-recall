import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { GalleryPage } from "./pages/GalleryPage";
import { MainPage } from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";

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
				<Route
					path="/settings"
					element={<SettingsPage />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
