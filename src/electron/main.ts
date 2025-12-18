import { app, BrowserWindow } from "electron";
import path from "node:path";
import { createMenu } from "./menu.js";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { createTray } from "./tray.js";
import { ipcMainHandle, ipcMainOn, isDevelopment } from "./utils.js";

// Menu.setApplicationMenu(null);

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		webPreferences: {
			preload: getPreloadPath(),
		},
		frame: false,
	});
	if (isDevelopment()) {
		mainWindow.loadURL("http://localhost:5173");
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
	}

	pollResources(mainWindow);

	ipcMainHandle("getStaticData", getStaticData);
	ipcMainOn("sendFrameAction", (action) => {
		switch (action) {
			case "MINIMIZE":
				mainWindow.minimize();
				break;
			case "MAXIMIZE":
				if (mainWindow.isMaximized()) {
					mainWindow.unmaximize();
				} else {
					mainWindow.maximize();
				}
				break;
			case "CLOSE":
				mainWindow.close();
				break;
		}
	});

	createMenu(mainWindow);
	createTray(mainWindow);

	handleCloseEvents(mainWindow);
});

const handleCloseEvents = (mainWindow: BrowserWindow) => {
	let willClose = false;

	mainWindow.on("close", (e) => {
		if (willClose) {
			return;
		}

		e.preventDefault();
		mainWindow.hide();

		if (app.dock) {
			app.dock.hide();
		}
	});

	app.on("before-quit", () => {
		willClose = true;
	});

	mainWindow.on("show", () => {
		willClose = false;
	});
};
