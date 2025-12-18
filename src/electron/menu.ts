import { app, Menu } from "electron";
import { ipcWebContentsSend, isDevelopment } from "./utils.js";

export const createMenu = (mainWindow: Electron.BrowserWindow) => {
	Menu.setApplicationMenu(
		Menu.buildFromTemplate([
			{
				label: process.platform === "darwin" ? undefined : "App",
				type: "submenu",
				submenu: [
					{
						label: "Quit",
						click: () => app.quit(),
					},
					{
						label: "Devtools",
						click: () => mainWindow.webContents.toggleDevTools(),
						visible: isDevelopment(),
					},
				],
			},
			{
				label: "View",
				type: "submenu",
				submenu: [
					{
						label: "CPU",
						click: () =>
							ipcWebContentsSend("changeView", mainWindow.webContents, "CPU"),
					},
					{
						label: "RAM",
						click: () =>
							ipcWebContentsSend("changeView", mainWindow.webContents, "RAM"),
					},
					{
						label: "Storage",
						click: () =>
							ipcWebContentsSend(
								"changeView",
								mainWindow.webContents,
								"STORAGE",
							),
					},
				],
			},
		]),
	);
};
