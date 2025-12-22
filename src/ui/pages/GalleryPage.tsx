import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface Image {
	name: string;
	url: string;
	timestamp: string;
}

export const GalleryPage = () => {
	const [images, setImages] = useState<Image[]>([]);
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetchImages();
	}, []);

	const fetchImages = async () => {
		try {
			const data = await window.electron.getImages();
			setImages(data);
		} catch (error) {
			console.error("Failed to fetch images", error);
		} finally {
			setLoading(false);
		}
	};

	const formatDate = (isoString: string) => {
		return new Date(isoString).toLocaleString();
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mx-auto max-w-360">
				<div className="mb-6 flex items-center justify-between">
					<button
						type="button"
						onClick={() => navigate("/")}
						className="flex cursor-pointer items-center gap-2 text-gray-900 transition-colors hover:text-black"
					>
						<Icon
							icon="heroicons:arrow-left"
							className="h-5 w-5"
						/>
						<span className="font-medium">Back to Search</span>
					</button>
					<h1 className="font-bold text-2xl text-gray-900">Gallery</h1>
					<div className="w-20" />
				</div>

				{loading ? (
					<div className="flex justify-center py-20">
						<div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
					</div>
				) : images.length === 0 ? (
					<div className="flex flex-col items-center justify-center py-20 text-gray-500">
						<Icon
							icon="heroicons:photo"
							className="mb-4 h-16 w-16 text-gray-300"
						/>
						<p className="text-lg">There are no images yet.</p>
						<p className="text-sm">
							Screenshots will appear here automatically.
						</p>
					</div>
				) : (
					<div className="columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
						{images.map((img) => (
							<button
								key={img.name}
								className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
								onClick={() => setSelectedImage(img)}
								type="button"
							>
								<img
									src={img.url}
									alt={img.name}
									className="h-auto w-full object-cover"
									loading="lazy"
								/>
								<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
								<div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<p className="truncate text-white text-xs">
										{formatDate(img.timestamp)}
									</p>
								</div>
							</button>
						))}
					</div>
				)}
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
								onClick={() => setSelectedImage(null)}
								className="cursor-pointer rounded-full bg-white p-2 text-gray-800 shadow-lg transition-colors hover:bg-gray-100"
								title="Close"
								type="button"
							>
								<Icon
									icon="heroicons:x-mark"
									className="h-5 w-5"
								/>
							</button>
						</div>

						<div className="flex flex-1 items-center justify-center overflow-auto bg-gray-100">
							<img
								src={selectedImage.url}
								alt={selectedImage.name}
								className="max-h-[80vh] max-w-full object-contain"
							/>
						</div>

						<div className="border-gray-100 border-t bg-white p-4">
							<h3 className="font-semibold text-gray-900 text-lg">
								{formatDate(selectedImage.timestamp)}
							</h3>
							<p className="text-gray-500 text-sm">{selectedImage.name}</p>
						</div>
					</button>
				</button>
			)}
		</div>
	);
};
