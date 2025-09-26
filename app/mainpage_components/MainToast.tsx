"use client";

import { useRouter } from "next/navigation";
import React from "react";

const MainToast = () => {
	const router = useRouter();

	const handleClick = () => {
		router.push("/reservation");
	};

	return (
		<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl bg-[#272727] text-white px-4 py-3 md:px-6 md:py-4 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
			{/* 텍스트 */}
			<span className="text-sm sm:text-base md:text-lg font-semibold text-center md:text-left whitespace-normal">
				“내 주식, 이대로 괜찮을까?” 지금 바로 TPT에게 상담하세요!
			</span>

			{/* 버튼 */}
			<button
				onClick={handleClick}
				className="bg-[#EF5555] text-white font-semibold px-4 py-2 md:px-6 md:py-2 rounded-md cursor-pointer w-full md:w-auto"
			>
				상담 신청
			</button>
		</div>
	);
};

export default MainToast;
