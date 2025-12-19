import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

// Mock data
const images = Array.from({ length: 20 }).map((_, i) => ({
	id: i,
	url: `https://picsum.photos/seed/${i}/400/${Math.floor(
		Math.random() * 300 + 300
	)}`,
	title: `Image ${i + 1}`,
}));

export default function GalleryPage() {
	const [selectedImage, setSelectedImage] = useState<(typeof images)[0] | null>(
		null
	);
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="mb-6 flex items-center justify-between">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex cursor-pointer items-center gap-2 text-secondary transition-colors hover:text-primary"
				>
					<Icon
						icon="heroicons:arrow-left"
						className="w-5 h-5"
					/>
					<span className="font-medium">Back to Search</span>
				</button>
				<h1 className="font-bold text-2xl text-secondary">Gallery</h1>
				<div className="w-20" /> {/* Spacer for centering if needed */}
			</div>

			<div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
				{images.map((img) => (
					<button
						key={img.id}
						className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
						onClick={() => setSelectedImage(img)}
						type="button"
					>
						<img
							src={img.url}
							alt={img.title}
							className="h-auto w-full object-cover"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
					</button>
				))}
			</div>

			{selectedImage && (
				<button
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
					onClick={() => setSelectedImage(null)}
					type="button"
				>
					<button
						className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
						onClick={(e) => e.stopPropagation()}
						type="button"
					>
						<div className="absolute top-4 right-4 z-10 flex gap-2">
							<button
								onClick={() => {
									// Handle delete logic here
									console.log("Delete", selectedImage.id);
									setSelectedImage(null);
								}}
								className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg cursor-pointer"
								title="Delete"
								type="button"
							>
								<Icon
									icon="heroicons:trash"
									className="w-5 h-5"
								/>
							</button>
							<button
								onClick={() => setSelectedImage(null)}
								className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
								title="Close"
								type="button"
							>
								<Icon
									icon="heroicons:x-mark"
									className="w-5 h-5"
								/>
							</button>
						</div>

						<div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
							<img
								src={selectedImage.url}
								alt={selectedImage.title}
								className="max-w-full max-h-[80vh] object-contain"
							/>
						</div>

						<div className="p-4 bg-white border-t border-gray-100">
							<h3 className="text-lg font-semibold text-secondary">
								{selectedImage.title}
							</h3>
						</div>
					</button>
				</button>
			)}
		</div>
	);
}
