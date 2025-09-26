"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
	Mail,
	Phone,
	Lock,
	CreditCard,
	IdCard,
	LogOut,
	Headphones,
	Trash2,
} from "lucide-react";
import CustomCalendar from "./calander";
import { CalendarProps } from "react-calendar";
import ProfileImageUploader from "./profileImageUploader";
import SubscribeModal from "./subscribeModal";
import BottomNotion from "./bottomNotion";

type Value = CalendarProps["value"];

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
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const [isSubModalOpen, setIsSubModalOpen] = useState(false);

	const handleProfileImageChange = (file: File) => {
		const imageUrl = URL.createObjectURL(file);
		setProfileImage(imageUrl);

		// TODO - 프로필 사진 변경 API 연동 
	};

	return (
		<div className="flex h-screen bg-white">
			{/* 왼쪽 사이드바 */}
			<aside className="w-64 bg-[#0f172a] text-white flex flex-col items-center py-10">
				{/* 프로필 영역 */}
				<div className="flex flex-col items-center gap-2 mb-8">
					<ProfileImageUploader
						profileImage={profileImage}
						onChange={handleProfileImageChange}
					/>
					<span className="font-semibold text-lg">{mockUser.name} 님</span>
				</div>

				{/* 계정 정보 */}
				<div className="bg-white/10 rounded-lg px-4 py-3 w-52 text-sm mb-6">
					<p className="flex items-center gap-2">
						<Mail size={16} /> {mockUser.email}
					</p>
					<p className="flex items-center gap-2 mt-1">
						<Phone size={16} /> {mockUser.phone}
					</p>
				</div>

				{/* 메뉴 */}
				<nav className="flex flex-col gap-3 w-52 text-sm">
					<button
						onClick={() => router.push("/mypage/password")}
						className="flex items-center gap-2 cursor-pointer"
					>
						<Lock size={16} /> 비밀번호 변경
					</button>
					<button
						onClick={() => router.push("/mypage/payment")}
						className="flex items-center gap-2 cursor-pointer"
					>
						<CreditCard size={16} /> 결제수단 관리
					</button>
					<button
						onClick={() => router.push("/mypage/uid")}
						className="flex items-center gap-2 cursor-pointer"
					>
						<IdCard size={16} /> UID 관리
					</button>
				</nav>

				{/* 로그아웃 및 기타 */}
				<div className="mt-auto flex flex-col items-center gap-3 w-52">
					<button
						onClick={() => router.push("/logout")}
						className="flex items-center gap-2 text-sm cursor-pointer"
					>
						<LogOut size={16} /> LOG OUT
					</button>
					<button
						onClick={() => router.push("/customercenter")}
						className="flex items-center gap-2 text-sm cursor-pointer"
					>
						<Headphones size={16} /> 고객센터
					</button>
					<button
						onClick={() => router.push("/mypage/withdraw")}
						className="flex items-center gap-2 text-sm text-red-400 cursor-pointer"
					>
						<Trash2 size={16} /> 회원 탈퇴
					</button>
				</div>
			</aside>

			{/* 메인 콘텐츠 */}
			<main className="flex-1 p-10 overflow-y-auto max-h-screen">
				{/* Invitation Card */}
				<div className="max-w-2xl mx-auto text-center">
					<h1 className="text-3xl font-serif text-[#B9AB70] mb-6">
						Invitation Card
					</h1>

					{/* 구독 카드 */}
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

					{/* 무료 상담 신청 버튼 */}
					<button
						onClick={() => router.push("/reservation")}
						className="w-full py-3 bg-[#F5F5F5] text-[#0f172a] rounded-md cursor-pointer"
					>
						고민된다면, 무료 전화 상담 신청하기
					</button>

					{/* 상담 신청 내역 */}
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
			</main>
		</div>
	);
}
