import { Icon } from "@iconify/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
	const [showPermissionModal, setShowPermissionModal] = useState(() => {
		const hasPermission = localStorage.getItem("hasDocumentsPermission");
		return !hasPermission;
	});
	const navigate = useNavigate();

	const handleGrantPermission = () => {
		localStorage.setItem("hasDocumentsPermission", "true");
		setShowPermissionModal(false);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-gray-900">
			<div className="flex w-full max-w-2xl flex-col gap-6">
				<div className="flex flex-col items-center gap-2">
					<Icon
						icon="heroicons:cpu-chip"
						className="h-12 w-12 text-black"
					/>
					<h1 className="text-center font-bold text-4xl text-gray-900">
						Mac Recall
					</h1>
				</div>

				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Icon
							icon="heroicons:magnifying-glass"
							className="h-5 w-5 text-gray-400"
						/>
					</div>
					<input
						type="text"
						className="block w-full rounded-xl border border-gray-300 bg-white py-3 pr-10 pl-10 leading-5 placeholder-gray-400 shadow-sm transition-all focus:border-black focus:outline-none focus:ring-2 focus:ring-black sm:text-sm"
						placeholder="Search..."
					/>
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						<button
							type="button"
							onClick={() => navigate("/settings")}
							className="cursor-pointer text-gray-400 hover:text-gray-600"
						>
							<Icon
								icon="heroicons:adjustments-horizontal"
								className="h-5 w-5"
							/>
						</button>
					</div>
				</div>

				<div className="min-h-75 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
					<p className="mt-10 text-center text-gray-500">
						Search results will appear here...
					</p>
					<div className="mt-8 text-center">
						<button
							onClick={() => navigate("/gallery")}
							className="cursor-pointer font-medium text-black hover:underline"
							type="button"
						>
							View Gallery Demo
						</button>
					</div>
				</div>
			</div>

			{showPermissionModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
					<div className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
						<div className="mb-4 flex items-center justify-center">
							<div className="rounded-full bg-gray-100 p-3">
								<Icon
									icon="heroicons:folder-open"
									className="h-8 w-8 text-black"
								/>
							</div>
						</div>
						<h2 className="mb-2 text-center font-bold text-gray-900 text-xl">
							Permission Required
						</h2>
						<p className="mb-6 text-center text-gray-600">
							Please grant permission to access your documents folder to
							continue.
						</p>
						<button
							onClick={handleGrantPermission}
							type="button"
							className="w-full cursor-pointer rounded-lg bg-black py-2 font-medium text-white transition-colors hover:bg-gray-800"
						>
							Grant Access
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
