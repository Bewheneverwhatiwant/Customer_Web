"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MyPageSidebar from "./MyPageSidebar";
import MyPageMain from "./MyPageMain";

import { UserStatus } from "../mocks/status";
import CustomCalendar from "./calander";
import { CalendarProps } from "react-calendar";
import SubscribeModal from "./subscribeModal";
import BottomNotion from "./bottomNotion";

type Value = CalendarProps["value"];

// "UID_REVIEW_PENDING"
// "UID_REJECTED"
// "UID_APPROVED"
// "PAID_BEFORE_TEST"
// "PAID_AFTER_TEST_TRAINER_ASSIGNING"
// "TRAINER_ASSIGNED"

// mockData
const state: UserStatus = "TRAINER_ASSIGNED"; // 바꿔가면서 테스트

// mockData
const mockUser = {
	name: "김개똥",
	email: "apple123@gmail.com",
	phone: "010-1234-5678",
	profileImage: null,
};

export default function MyPage() {
	const router = useRouter();
	const [date, setDate] = useState<Value>(new Date());
	const [isSubModalOpen, setIsSubModalOpen] = useState(false);

	return (
		<div className="flex h-screen bg-white">
			<MyPageSidebar name={mockUser.name} email={mockUser.email} phone={mockUser.phone} />
			<MyPageMain state={state} />

			{/* 메인 콘텐츠 */}
			{/* <main className="flex-1 p-10 overflow-y-auto max-h-screen">
				
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="text-3xl font-serif text-[#B9AB70] mb-6">
						Invitation Card
					</h1>

					
					<button className="w-full bg-gradient-to-r from-[#D2C693] to-[#928346] text-white rounded-md p-6 mb-6 cursor-pointer"
						onClick={() => setIsSubModalOpen(true)}
					>
						<h2 className="text-xl font-semibold mb-2">정기 결제 구독하기</h2>
						<p className="text-sm text-white/90 mb-4">
							TPT가 엄선한 트레이딩 전문가에게
							<br />
							나의 트레이딩을 피드백 받아 보세요.
							<br />
							트레이딩 성과를 체계적으로 개선할 수 있습니다.
						</p>
						<p className="text-2xl font-bold">260,000원/월 갱신</p>
					</button>

					<SubscribeModal
						isOpen={isSubModalOpen}
						onClose={() => setIsSubModalOpen(false)}
					/>

					
					<button
						onClick={() => router.push("/reservation")}
						className="w-full py-3 bg-[#F5F5F5] text-[#0f172a] rounded-md cursor-pointer"
					>
						고민된다면, 무료 전화 상담 신청하기
					</button>

					
					<div className="text-left mt-10">
						<h3 className="mb-3">상담 신청 내역</h3>
						<div className="bg-[#F5F5F5] text-[#0f172a] rounded-md p-4 flex justify-between items-center text-sm">
							<span>2025년 8월 24일 17:00 전화 상담 예약</span>
							<div className="flex gap-2">
								<button className="px-3 py-1 rounded-md border text-red-500 border-red-300 cursor-pointer">
									취소
								</button>
								<button className="px-3 py-1 rounded-md border text-blue-500 border-blue-300 cursor-pointer">
									변경
								</button>
							</div>
						</div>
					</div>

					<div className="w-full flex items-center justify-center p-3 mt-10 mb-10">
						<CustomCalendar value={date} onChange={setDate} />
					</div>

					<BottomNotion />
				</div>
			</main> */}
		</div>
	);
}
