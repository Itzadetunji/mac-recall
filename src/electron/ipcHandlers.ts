import { ipcMain } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import { getScreenshotDirectoryPath, getScreenshotInterval, setScreenshotInterval } from "./screenshotManager.js";

export const registerIpcHandlers = () => {
  ipcMain.handle("getImages", async () => {
    try {
      const dir = getScreenshotDirectoryPath();
      const files = await fs.readdir(dir);
      const imageFiles = files
        .filter((file) => file.endsWith(".png"))
        .map((file) => ({
          name: file,
          url: `screenshot://${path.join(dir, file)}`,
          timestamp: fs.stat(path.join(dir, file)).then((stat) => stat.mtime),
        }));

      const imagesWithTime = await Promise.all(
        imageFiles.map(async (img) => {
          const stat = await fs.stat(path.join(dir, img.name));
          return {
            ...img,
            timestamp: stat.mtime.toISOString(),
          };
        })
      );

      imagesWithTime.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return imagesWithTime;
    } catch (error) {
      console.error("Failed to list images:", error);
      return [];
    }
  });

  ipcMain.handle("getSettings", () => {
    return { interval: getScreenshotInterval() };
  });

  ipcMain.handle("saveSettings", (_, interval: number) => {
    if (typeof interval === "number" && interval >= 1000) {
      setScreenshotInterval(interval);
      return true;
    }
    return false;
  });
};
