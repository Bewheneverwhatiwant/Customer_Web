"use client";
import MyPageSidebar from "./MyPageSidebar";
import MyPageMain from "./MyPageMain";

import { UserStatus } from "../mocks/status";
import { CalendarProps } from "react-calendar";

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

	return (
		<div className="flex h-screen bg-white">
			<MyPageSidebar name={mockUser.name} email={mockUser.email} phone={mockUser.phone} />
			<MyPageMain state={state} />
		</div>
	);
}
