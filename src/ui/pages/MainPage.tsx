import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-secondary">
			<div className="absolute top-4 right-4">
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white shadow-md transition-colors hover:bg-opacity-90"
					type="button"
				>
					<Icon
						icon="heroicons:document-text"
						className="h-5 w-5"
					/>
					<span>Access Documents</span>
				</button>
			</div>

			<div className="flex w-full max-w-2xl flex-col gap-6">
				<h1 className="text-center font-bold text-4xl text-secondary">
					Mac Recall
				</h1>

				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<Icon
							icon="heroicons:magnifying-glass"
							className="h-5 w-5 text-gray-400"
						/>
					</div>
					<input
						type="text"
						className="block w-full rounded-xl border border-accent bg-white py-3 pr-3 pl-10 leading-5 placeholder-gray-400 shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm"
						placeholder="Search..."
					/>
				</div>

				<div className="min-h-75 rounded-2xl border border-accent/30 bg-white p-6 shadow-lg">
					<p className="mt-10 text-center text-gray-500">
						Search results will appear here...
					</p>
					<div className="mt-8 text-center">
						<button
							onClick={() => navigate("/gallery")}
							className="cursor-pointer font-medium text-primary hover:underline"
							type="button"
						>
							View Gallery Demo
						</button>
					</div>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
					<div className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
						<div className="items-center mb-4 flex  justify-between">
							<h2 className="font-bold text-secondary text-xl">Documents</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								type="button"
								className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
							>
								<Icon
									icon="heroicons:x-mark"
									className="h-6 w-6"
								/>
							</button>
						</div>
						<div className="space-y-4">
							<p className="text-gray-600">
								Your documents will be listed here.
							</p>
							<button
								type="button"
								className="w-full cursor-pointer rounded-lg bg-primary py-2 font-medium text-white transition-colors hover:bg-opacity-90"
							>
								Import Document
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
