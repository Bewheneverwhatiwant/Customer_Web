"use client";

import { useState, useEffect } from "react";
import { User } from "@/app/types/user";
import WeekSelector from "../WeekSelector";

type Props = {
	onSubmit: (data: any) => void;
	currentUser: User;
	riskTaking?: number; // 기본값 5%
};

export default function ScalpingAfterForm({ onSubmit, currentUser, riskTaking = 5 }: Props) {
	const { investmentType, completion } = currentUser;

	const handleWeekChange = (data: { month: number; week: number }) => {
		console.log("현재 선택된 값:", data);
		// TODO: 필요하면 form 데이터에 포함해서 서버 전송
	};

	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [position, setPosition] = useState<"Long" | "Short" | null>(null);
	const [isPositive, setIsPositive] = useState(true);
	const [pl, setPl] = useState<number>(0); // P&L 입력값 (퍼센트)
	const [rr, setRr] = useState<number>(0); // R&R 값

	useEffect(() => {
		if (pl !== 0) {
			setRr(Number((riskTaking / Math.abs(pl)).toFixed(2)));
		} else {
			setRr(0);
		}
	}, [pl, riskTaking]);

	// 게이지 범위: -3 ~ +3
	const gaugeMin = -3;
	const gaugeMax = 3;
	const normalized = Math.min(Math.max(pl / riskTaking, gaugeMin), gaugeMax);

	// 화살표 색상 조건
	let arrowColor = "text-gray-500";
	if (normalized <= -2) arrowColor = "text-red-500";
	else if (normalized >= 2) arrowColor = "text-green-600";

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const imageUrl = URL.createObjectURL(file);
			setScreenshot(imageUrl);
		}
	};

	const handleUploadClick = () => {
		document.getElementById("screenshotInput")?.click();
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = {
			screenshot,
			position,
			pl: isPositive ? pl : -pl,
			rr,
		};
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">

			{/* 상단: 투자유형, 완강여부, (스윙일 때 주차 선택) */}
			<div className="flex items-center gap-3 mb-6">
				<span
					className={`px-3 py-1 text-white rounded
    ${investmentType === "스윙" ? "bg-orange-400" : ""}
    ${investmentType === "데이" ? "bg-green-400" : ""}
    ${investmentType === "스켈핑" ? "bg-sky-400" : ""}`}
				>
					{investmentType}
				</span>
				<span className="px-3 py-1 border rounded">{completion}</span>

				{investmentType === "스윙" && (
					<WeekSelector onChange={handleWeekChange} />
				)}
			</div>

			<div>
				<label className="block mb-1 font-medium">기록 날짜</label>
				<input
					type="date"
					value={new Date().toISOString().split("T")[0]}
					readOnly
					className="border border-gray-300 rounded p-2 w-full cursor-not-allowed bg-gray-100"
				/>
			</div>

			{/* 종목 */}
			<div>
				<label className="block mb-1 font-medium">종목</label>
				<input
					type="text"
					placeholder="투자 종목을 입력하세요."
					className="bg-[#F4F4F4] rounded p-2 w-full"
				/>
			</div>

			<div>
				<label className="block mb-1 font-medium">하루 매매 횟수</label>
				<input
					type="text"
					placeholder="내용 입력"
					className="bg-[#F4F4F4] rounded p-2 w-full"
				/>
			</div>

			{/* 스크린샷 업로드 */}
			<div>
				<label className="block mb-1 font-medium">스크린샷 업로드</label>
				<div
					className="w-full h-40 rounded bg-[#F4F4F4] flex items-center justify-center cursor-pointer overflow-hidden"
					onClick={handleUploadClick}
				>
					{screenshot ? (
						<img
							src={screenshot}
							alt="screenshot preview"
							className="object-contain w-full h-full"
						/>
					) : (
						<span className="text-gray-400">이미지를 업로드하세요</span>
					)}
				</div>
				<input
					type="file"
					id="screenshotInput"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>

			{/* 리스크 테이킹 */}
			<div className="flex-1">
				<label className="block mb-1 font-medium">리스크 테이킹 (%)</label>
				<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
			</div>

			<div className="flex-1">
				<label className="block mb-1 font-medium">레버리지 (배)</label>
				<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
			</div>

			<div className="flex-1">
				<label className="block mb-1 font-medium">총 포지션 잡은 횟수</label>
				<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
			</div>

			<div className="flex-1">
				<label className="block mb-1 font-medium">총 매매횟수 대비 수익 매매횟수</label>
				<input type="number" className="bg-[#F4F4F4] rounded p-2 w-full" />
			</div>

			{/* 근거 및 복기 */}
			<div>
				<label className="block mb-1 font-medium">15분봉 기준 추세 분석</label>
				<textarea className="bg-[#F4F4F4] rounded p-2 w-full h-24" />
			</div>
			<div>
				<label className="block mb-1 font-medium">담당 트레이너 피드백 요청 사항</label>
				<textarea className="bg-[#F4F4F4] rounded p-2 w-full h-24" />
			</div>

			{/* 제출 */}
			<button
				type="submit"
				className="bg-gradient-to-r from-[#D2C693] to-[#928346] text-white py-3 rounded mb-20"
			>
				매매일지 기록하기
			</button>
		</form>
	);
}
