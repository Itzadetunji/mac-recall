import fs from "node:fs";
import os from "node:os";
import osUtils from "os-utils";

const POLLING_INTERVAL = 500;

export const pollResources = () => {
	setInterval(async () => {
		const cpuUsage = (await getCpuUsage()) as number;
		const ramUsage = getRamUsage() as number;
		const storageData = getStorageUsage();

		console.log(`CPU Usage: ${(cpuUsage * 100).toFixed(2)}%`);
		console.log(`RAM Usage: ${(ramUsage * 100).toFixed(2)}%`);
		console.log(`Storage Usage: ${(storageData.usage * 100).toFixed(2)}%`);
	}, POLLING_INTERVAL);
};

export const getStaticData = () => {
	const totalStorage = getStorageUsage().total;
	const cpuModel = os.cpus()[0].model;
	const totalMemoryGB = Math.round(osUtils.totalmem() / 1024);

	return {
		totalStorage,
		cpuModel,
		totalMemoryGB,
	};
};

const getCpuUsage = () => {
	return new Promise((resolve) => {
		osUtils.cpuUsage(resolve);
	});
};

const getRamUsage = () => {
	return 1 - osUtils.freememPercentage();
};

const getStorageUsage = () => {
	const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
	const total = stats.bsize * stats.blocks;
	const free = stats.bsize * stats.bfree;

	return {
		total: Math.round(total / 1_000_000_000), // in GB
		usage: 1 - free / total,
	};
};
