import path from "node:path";
import { app, BrowserWindow } from "electron";
import { pollResources } from "./resourceManager.js";
import { isDevelopment } from "./utils.js";

app.on("ready", () => {
	const mainWindow = new BrowserWindow();
	if (isDevelopment()) {
		mainWindow.loadURL("http://localhost:5173");
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
	}

	pollResources();
});
