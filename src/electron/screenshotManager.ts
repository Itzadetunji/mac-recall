import { app, desktopCapturer, systemPreferences } from "electron";
import { existsSync, mkdirSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

let screenshotInterval: NodeJS.Timeout | null = null;
let currentIntervalMs = 5000;

const getDocumentsPath = () => app.getPath("documents");
const getScreenshotDir = () => path.join(getDocumentsPath(), "Mac Recall Documents");

// Ensure directory exists
export const initScreenshotManager = () => {
  const dir = getScreenshotDir();
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Request permission immediately on launch (macOS)
  if (process.platform === "darwin") {
    const status = systemPreferences.getMediaAccessStatus("screen");
    if (status !== "granted") {
      // This triggers the OS prompt
      desktopCapturer
        .getSources({
          types: ["screen"],
          thumbnailSize: { width: 0, height: 0 },
        })
        .catch((e) => console.error("Permission check failed:", e));
    }
  }

  startScreenshotLoop();
};

export const startScreenshotLoop = () => {
  if (screenshotInterval) clearInterval(screenshotInterval);

  screenshotInterval = setInterval(async () => {
    try {
      await captureAndSaveScreenshot();
    } catch (error) {
      console.error("Failed to capture screenshot:", error);
    }
  }, currentIntervalMs);
};

export const stopScreenshotLoop = () => {
  if (screenshotInterval) {
    clearInterval(screenshotInterval);
    screenshotInterval = null;
  }
};

export const setScreenshotInterval = (intervalMs: number) => {
  currentIntervalMs = intervalMs;
  if (screenshotInterval) {
    startScreenshotLoop(); // Restart with new interval
  }
};

export const getScreenshotInterval = () => currentIntervalMs;

const captureAndSaveScreenshot = async () => {
  try {
    const sources = await desktopCapturer.getSources({
      types: ["screen"],
      thumbnailSize: { width: 1920, height: 1080 }, // Adjust resolution as needed
    });

    if (sources.length > 0) {
      const source = sources[0]; // Primary screen usually
      const image = source.thumbnail.toPNG();

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `screenshot-${timestamp}.png`;
      const filePath = path.join(getScreenshotDir(), filename);

      await fs.writeFile(filePath, image);
    } else {
      console.warn("No screen sources found. This might be due to missing screen recording permissions on macOS.");
    }
  } catch (error) {
    console.error("Error in captureAndSaveScreenshot:", error);
  }
};

export const getScreenshotDirectoryPath = () => getScreenshotDir();
