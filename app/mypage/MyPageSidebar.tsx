"use client";

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
	Replace,
} from "lucide-react";
import ProfileImageUploader from "./profileImageUploader";
import { useState } from "react";
import CustomModal from "../components/CustomModal"; // variant={1}
import { useAuthStore } from "../stores/authStore";

type Props = {
	name: string;
	email: string;
	phone: string;
};

export default function MyPageSidebar({ name, email, phone }: Props) {
	const router = useRouter();
	const [profileImage, setProfileImage] = useState<string | null>(null);

	// Modal 상태 관리
	const [openModal, setOpenModal] = useState<null | "password" | "uid" | "type" | "withdraw">(null);

	// authStore
	const { logout } = useAuthStore();

	const handleLogout = () => {
		logout();
		router.push("/login");
	};

	const handleProfileImageChange = (file: File) => {
		const imageUrl = URL.createObjectURL(file);
		setProfileImage(imageUrl);
	};

	return (
		<aside className="w-64 bg-[#0f172a] text-white flex flex-col items-center py-10">
			{/* 프로필 */}
			<div className="flex flex-col items-center gap-2 mb-8">
				<ProfileImageUploader profileImage={profileImage} onChange={handleProfileImageChange} />
				<span className="font-semibold text-lg">{name} 님</span>
			</div>

			{/* 계정 정보 */}
			<div className="bg-white/10 rounded-lg px-4 py-3 w-52 text-sm mb-6">
				<p className="flex items-center gap-2">
					<Mail size={16} /> {email}
				</p>
				<p className="flex items-center gap-2 mt-1">
					<Phone size={16} /> {phone}
				</p>
			</div>

			{/* 메뉴 */}
			<nav className="flex flex-col gap-3 w-52 text-sm">
				<button onClick={() => setOpenModal("password")} className="flex items-center gap-2 cursor-pointer">
					<Lock size={16} /> 비밀번호 변경
				</button>
				<button onClick={() => router.push("/mypayment")} className="flex items-center gap-2 cursor-pointer">
					<CreditCard size={16} /> 결제수단 관리
				</button>
				<button onClick={() => setOpenModal("uid")} className="flex items-center gap-2 cursor-pointer">
					<IdCard size={16} /> UID 관리
				</button>
				<button onClick={() => setOpenModal("type")} className="flex items-center gap-2 cursor-pointer">
					<Replace size={16} /> 투자유형 변경
				</button>
			</nav>

			{/* 로그아웃 및 기타 */}
			<div className="mt-auto flex flex-col items-center gap-3 w-52">
				<button onClick={handleLogout} className="flex items-center gap-2 text-sm cursor-pointer">
					<LogOut size={16} /> LOG OUT
				</button>
				<button onClick={() => router.push("/customercenter")} className="flex items-center gap-2 text-sm cursor-pointer">
					<Headphones size={16} /> 고객센터
				</button>
				<button
					onClick={() => setOpenModal("withdraw")}
					className="flex items-center gap-2 text-sm text-red-400 cursor-pointer"
				>
					<Trash2 size={16} /> 회원 탈퇴
				</button>
			</div>

			{/* 모달 관리 */}
			<CustomModal variant={1} isOpen={openModal === "password"} onClose={() => setOpenModal(null)} width="max-w-xl">
				<h2 className="text-lg mb-4">비밀번호 변경</h2>
				<p>비밀번호 변경 기능 구현</p>
			</CustomModal>

			<CustomModal variant={1} isOpen={openModal === "uid"} onClose={() => setOpenModal(null)} width="max-w-xl">
				<h2 className="text-lg mb-4">UID 관리</h2>
				<p>UID 관리 기능 구현</p>
			</CustomModal>

			<CustomModal variant={1} isOpen={openModal === "type"} onClose={() => setOpenModal(null)} width="max-w-xl">
				<h2 className="text-lg mb-4">투자유형 변경</h2>
				<p>투자유형 변경 기능 구현</p>
			</CustomModal>

			<CustomModal variant={1} isOpen={openModal === "withdraw"} onClose={() => setOpenModal(null)} width="max-w-xl">
				<p className="text-center">정말로 회원 탈퇴하시겠습니까?</p>
			</CustomModal>
		</aside>
	);
}
