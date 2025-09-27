"use client";

import React from "react";
import CustomButton from "../components/CustomButton";
import { useRouter } from "next/navigation";

interface DayData {
	day: string; // 요일
	trades: number | string;
	wins: number | string;
	losses: number | string;
	dailyPnL: number | string;
	new: boolean; // 새로운 데이터 여부
}

interface WeekSummary {
	winRate: string;
	profitLossRatio: string;
	weeklyPnL: string;
}

interface WeekFeedbackProps {
	year: string;
	month: string;
	week: string; // ex) "셋째 주"
	days: DayData[];
	summary: WeekSummary;
}

// 완강후 데이일 경우 컴포넌트 추가하기 

export default function WeekFeedback({
	year,
	month,
	week,
	days,
	summary,
}: WeekFeedbackProps) {
	const router = useRouter();

	const handleDayClick = (day: string) => {
		router.push(`/dayfeedback?year=${year}&month=${month}&week=${week}&day=${day}`);
	};


	return (
		<div className="p-6 mt-20">
			{/* 타이틀 */}
			<h2 className="text-gray-400 text-lg mb-2">
				{year}년 / {month}월 / {week}
			</h2>
			<h1 className="text-2xl font-bold mb-6">주간 매매일지</h1>

			{/* 테이블 */}
			<div className="border border-gray-400 rounded-lg overflow-hidden mb-10">
				<table className="w-full border-collapse text-center">
					<thead>
						<tr>
							<th className="w-40 border border-gray-300 bg-gray-50"></th>
							{days.map((d) => (
								<th key={d.day} className="border border-gray-300 py-2 px-4">
									<button className="relative px-3 py-1 bg-gray-800 text-white text-sm rounded-md cursor-pointer"
										onClick={() => handleDayClick(d.day)}>
										{d.day}
										{d.new && (
											<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
										)}
									</button>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								매매횟수
							</td>
							{days.map((d) => (
								<td key={d.day + "-trades"} className="border border-gray-300">
									{d.trades}
								</td>
							))}
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								수익횟수
							</td>
							{days.map((d) => (
								<td key={d.day + "-wins"} className="border border-gray-300">
									{d.wins}
								</td>
							))}
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								손실횟수
							</td>
							{days.map((d) => (
								<td key={d.day + "-losses"} className="border border-gray-300">
									{d.losses}
								</td>
							))}
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								일간 p&l
							</td>
							{days.map((d) => (
								<td key={d.day + "-pnl"} className="border border-gray-300">
									{d.dailyPnL}
								</td>
							))}
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								승률
							</td>
							<td className="border border-gray-300" colSpan={days.length}>
								{summary.winRate}
							</td>
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								평균 손익비
							</td>
							<td className="border border-gray-300" colSpan={days.length}>
								{summary.profitLossRatio}
							</td>
						</tr>
						<tr>
							<td className="border border-gray-300 py-2 px-4 text-left">
								주간 p&l
							</td>
							<td className="border border-gray-300" colSpan={days.length}>
								{summary.weeklyPnL}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* 비교 섹션 */}
			<div className="mt-12">
				<h2 className="text-2xl font-semibold text-center mb-8">
					<span className="bg-yellow-100 px-2">
						지난 주 대비 이번 주의 매매 성적 변화량
					</span>
				</h2>

				<div className="grid grid-cols-2 gap-16">
					{/* 지난 주 */}
					<div>
						<h3 className="text-lg font-semibold text-center mb-4">지난 주</h3>
						<div className="border-t-2 border-yellow-900 pt-4">
							<div className="flex justify-between py-2 text-gray-700">
								<span>승률</span>
								<span>{summary.winRate}</span>
							</div>
							<div className="flex justify-between py-2 text-gray-700">
								<span>손익비</span>
								<span>{summary.profitLossRatio}</span>
							</div>
							<div className="flex justify-between py-2 text-gray-700">
								<span>p&l</span>
								<span>{summary.weeklyPnL}</span>
							</div>
						</div>
					</div>

					{/* 이번 주 */}
					<div>
						<h3 className="text-lg font-semibold text-center mb-4">이번 주</h3>
						<div className="border-t-2 border-yellow-900 pt-4">
							<div className="flex justify-between py-2 text-gray-900 font-semibold">
								<span>승률</span>
								<span>{summary.winRate}</span>
							</div>
							<div className="flex justify-between py-2 text-gray-900 font-semibold">
								<span>손익비</span>
								<span>{summary.profitLossRatio}</span>
							</div>
							<div className="flex justify-between py-2 text-gray-900 font-semibold">
								<span>p&l</span>
								<span>{summary.weeklyPnL}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col w-full gap-3 mt-20">
				<CustomButton variant="prettyFull">
					손실 매매 모아보기
				</CustomButton>
				<CustomButton variant="prettyFull">
					수익 매매 모아보기
				</CustomButton>
			</div>

			{/* 메모 섹션 */}
			<div className="mt-12">
				<h2 className="text-xl mb-4">
					이번 주 나의 매매 중 가장 큰 문제점 한 가지 메모하기
				</h2>
				<textarea
					placeholder="나의 매매를 복기하고 메모해주세요."
					className="w-full h-40 p-4 border border-gray-300 rounded-md resize-none"
				/>
				<div className="flex justify-end items-center mt-4">
					<CustomButton variant="normalClean">
						저장/수정하기
					</CustomButton>
				</div>
			</div>
		</div>
	);
}
