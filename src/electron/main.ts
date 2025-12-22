import { app, BrowserWindow, net, protocol } from "electron";
import path from "node:path";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { createTray } from "./tray.js";
import { ipcMainHandle, isDevelopment } from "./utils.js";
import { initScreenshotManager } from "./screenshotManager.js";
import { registerIpcHandlers } from "./ipcHandlers.js";

protocol.registerSchemesAsPrivileged([{ scheme: "screenshot", privileges: { bypassCSP: true } }]);

app.whenReady().then(() => {
  // Register custom protocol for serving local screenshots

  protocol.handle("screenshot", (request) => {
    const url = request.url.replace("screenshot://", "");
    try {
      const filePath = decodeURIComponent(url);
      return net.fetch(`file://${filePath}`);
    } catch (error) {
      console.error(error);
      return new Response("File not found", { status: 404 });
    }
  });
});

app.on("ready", () => {
  registerIpcHandlers();
  initScreenshotManager();
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDevelopment()) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  ipcMainHandle("getStaticData", getStaticData);

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
