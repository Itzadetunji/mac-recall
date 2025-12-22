import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhArrowLeftLight } from "../assets/svg-icons/arrow-left";

export default function SettingsPage() {
	const [interval, setInterval] = useState(5000);
	const [status, setStatus] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		window.electron
			.getSettings()
			.then((data) => setInterval(data.interval))
			.catch(console.error);
	}, []);

	const handleSave = async () => {
		try {
			const success = await window.electron.saveSettings(interval);
			if (success) {
				setStatus("Settings saved!");
				setTimeout(() => setStatus(""), 3000);
			} else {
				setStatus("Failed to save settings.");
			}
		} catch (error) {
			console.error("Error saving settings:", error);
			setStatus("Error saving settings.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mx-auto max-w-2xl">
				<div className="mb-6 flex items-center justify-between">
					<button
						onClick={() => navigate("/")}
						className="flex cursor-pointer items-center gap-2 text-gray-900 transition-colors hover:text-black"
						type="button"
					>
						<PhArrowLeftLight className="h-5 w-5" />
						<span className="font-medium">Back</span>
					</button>
					<h1 className="font-bold text-2xl text-gray-900">Settings</h1>
					<div className="w-20" />
				</div>

				<form className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
					<div className="mb-6">
						<label>
							<p className="mb-2 font-medium text-gray-700">
								Screenshot Interval (ms)
							</p>

							<input
								type="number"
								value={interval}
								onChange={(e) => setInterval(Number(e.target.value))}
								className="block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-black focus:ring-black"
								min="1000"
								step="1000"
							/>
						</label>
						<p className="mt-1 text-gray-500 text-sm">
							Minimum 1000ms (1 second)
						</p>
					</div>

					<button
						onClick={handleSave}
						className="w-full cursor-pointer rounded-lg bg-black px-5 py-2.5 text-center font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
						type="button"
					>
						Save Changes
					</button>

					{status && (
						<p
							className={`mt-4 text-center text-sm ${
								status.includes("Failed") || status.includes("Error")
									? "text-red-600"
									: "text-green-600"
							}`}
						>
							{status}
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
