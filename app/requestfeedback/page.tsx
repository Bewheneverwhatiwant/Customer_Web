"use client";

import FeedbackHeader from "./FeedbackHeader";
import BasicOrBeforeForm from "./forms/BasicOrBeforeForm";
import SwingAfterForm from "./forms/SwingAfterForm";
import DayAfterForm from "./forms/DayAfterForm";
import ScalpingAfterForm from "./forms/ScalpingAfterForm";
import { mockUsers } from "../mocks/user";
import { useAuth } from "../hooks/useAuth";
import { mapSwingFormData, mapDayFormData, mapScalpingFormData } from "../utils/feedbackFormMapper";

export default function RequestFeedback() {
	// 현재 로그인된 사용자
	// 0 - 무료, 1 - 스윙, 2 - 데이, 3 - 스켈핑 
	const currentUser = mockUsers[3];
	const { requestSwingFeedback, requestDayFeedback, requestScalpingFeedback } = useAuth();

	const { investmentType, completion } = currentUser;

	const handleSubmit = async (formData: any) => {
		console.log("서버로 전송할 데이터:", formData);

		try {
			let fd: FormData;
			let res;

			if (investmentType === "스윙") {
				fd = mapSwingFormData(formData);
				console.log("정제된 데이터는 (entries):");
				fd.forEach((value, key) => console.log(key, value));
				res = await requestSwingFeedback(fd);
			} else if (investmentType === "데이") {
				fd = mapDayFormData(formData);
				console.log("정제된 데이터는 (entries):");
				fd.forEach((value, key) => console.log(key, value));
				res = await requestDayFeedback(fd);
			} else if (investmentType === "스켈핑") {
				fd = mapScalpingFormData(formData);
				console.log("정제된 데이터는 (entries):");
				fd.forEach((value, key) => console.log(key, value));
				res = await requestScalpingFeedback(fd);
			}

			console.log("서버 응답:", res);
		} catch (error) {
			console.error("피드백 요청 예외 발생:", error);
			alert("네트워크 오류가 발생했습니다.");
		}
	};

	const renderForm = () => {
		if (completion === "무료" || completion === "완강전") {
			return <BasicOrBeforeForm onSubmit={handleSubmit} currentUser={currentUser} />;
		}
		if (completion === "완강후") {
			if (investmentType === "스윙") return <SwingAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
			if (investmentType === "데이") return <DayAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
			if (investmentType === "스켈핑") return <ScalpingAfterForm currentUser={currentUser} onSubmit={handleSubmit} />;
		}
		return <div>조건에 맞는 Form이 없습니다.</div>;
	};

	return (
		<div className="flex h-screen bg-white flex-col items-center gap-6 p-6 mt-20">
			{(completion == "완강전" || completion == "완강후") && (
				<FeedbackHeader />
			)}

			{/* 조건부 렌더링된 폼 */}
			<div className="w-full max-w-lg p-6">
				{renderForm()}
			</div>
		</div>
	);
}
