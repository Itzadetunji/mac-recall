import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "node:path";
import { getAssetPath } from "./pathResolver.js";

export const createTray = (mainWindow: BrowserWindow) => {
	const tray = new Tray(
		path.join(
			getAssetPath(),
			process.platform === "darwin"
				? "trayIconTemplate.png"
				: "trayIconTemplate.png",
		),
	);

	tray.setContextMenu(
		Menu.buildFromTemplate([
			{ label: "Quit", click: () => app.quit() },
			{
				label: "Show App",
				click: () => {
					mainWindow.show();
					if (app.dock) {
						app.dock.show();
					}
				},
			},
		]),
	);
};
