"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// hydration error 발생 중, 고치기 

interface Post {
	id: number;
	category: string;
	trainer: string;
	title: string;
	thumbnail: string;
	likes: number;
	comments: number;
}

const mockData: Post[] = [
	{
		id: 1,
		category: "주식",
		trainer: "트레이너 A",
		title: "칼럼 작성 시 지정한 썸네일 배너 사진",
		thumbnail: "/images/thumbnail1.png",
		likes: 99,
		comments: 2,
	},
	{
		id: 2,
		category: "채권",
		trainer: "트레이너 B",
		title: "칼럼 작성 시 지정한 썸네일 배너 사진",
		thumbnail: "/images/thumbnail2.png",
		likes: 99,
		comments: 2,
	},
	{
		id: 3,
		category: "ETF",
		trainer: "트레이너 C",
		title: "칼럼 작성 시 지정한 썸네일 배너 사진",
		thumbnail: "/images/thumbnail3.png",
		likes: 99,
		comments: 2,
	},
	{
		id: 4,
		category: "주식",
		trainer: "트레이너 B",
		title: "칼럼 작성 시 지정한 썸네일 배너 사진",
		thumbnail: "/images/thumbnail4.png",
		likes: 99,
		comments: 2,
	},
	{
		id: 5,
		category: "채권",
		trainer: "트레이너 A",
		title: "칼럼 작성 시 지정한 썸네일 배너 사진",
		thumbnail: "/images/thumbnail5.png",
		likes: 99,
		comments: 2,
	},
];

export default function AllPost() {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState("전체 카테고리");
	const [selectedTrainer, setSelectedTrainer] = useState("전체 트레이너");

	const categories = ["전체 카테고리", "주식", "채권", "ETF"];
	const trainers = ["전체 트레이너", "트레이너 A", "트레이너 B", "트레이너 C"];

	const filteredData = mockData.filter((post) => {
		return (
			(selectedCategory === "전체 카테고리" || post.category === selectedCategory) &&
			(selectedTrainer === "전체 트레이너" || post.trainer === selectedTrainer)
		);
	});

	return (
		<div className="w-full min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 lg:px-8">
			<h1 className="text-xl sm:text-2xl font-semibold mt-20 text-gray-800 text-center">
				트레이딩 전문가의 칼럼을 읽어보세요.
			</h1>

			<button className="mt-4 w-full sm:w-auto px-6 py-2 bg-[#B9AB70] text-white font-medium rounded-md shadow text-sm sm:text-base">
				구독하고 트레이닝 받아보기
			</button>

			<div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
				<select
					className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>

				<select
					className="border border-gray-300 rounded px-3 py-2 text-sm sm:text-base"
					value={selectedTrainer}
					onChange={(e) => setSelectedTrainer(e.target.value)}
				>
					{trainers.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
			</div>

			{/* 게시물 리스트 */}
			<div className="mt-8 w-full max-w-2xl flex flex-col gap-6">
				{filteredData.map((post) => (
					<div
						key={post.id}
						onClick={() => router.push("/detailpost")}
						className="cursor-pointer border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition"
					>

						<div
							className={`px-3 py-1 text-white text-sm font-medium ${post.category === "주식"
								? "bg-blue-600"
								: post.category === "채권"
									? "bg-green-600"
									: "bg-yellow-600"
								}`}
						>
							{post.category}
						</div>


						<div className="bg-gray-300 flex items-center justify-center h-24 sm:h-32 text-xs sm:text-sm">
							{post.title}
						</div>


						<div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 flex gap-4">
							<span>좋아요 {post.likes}</span>
							<span>댓글 {post.comments}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
