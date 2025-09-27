import { useRouter } from "next/navigation";
import CancelSubscriptionModal from "../CancelSubscriptionModal";
import { useState } from "react";

export default function TrainerAssigned() {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const handleCloseModal = () => {
		setOpen(false);
		router.push('/');
	}

	return (
		<div>
			<div className="flex w-full justify-between">
				<h1 className="text-2xl text-start mb-2 text-[#B9AB70]">TPT를 구독해주신 고객님 환영합니다.</h1>
				<div className="flex w-auto gap-2">
					<button className="border border-[#B9AB70] text-[#B9AB70] text-sm bg-white rounded-xl px-2 py-1 cursor-pointer"
						onClick={() => setOpen(true)}
					>구독 해지</button>
					<button className="text-white text-sm bg-[#B9AB70] rounded-xl px-2 py-1 cursor-pointer"
						onClick={() => { router.push('/myreview') }}
					>후기 작성</button>
				</div>
			</div>
			<div className="text-sm text-start mb-4 text-[#B9AB70]">
				TPT의 트레이딩 전문가와 함께 경험을 축적하세요.
			</div>

			<CancelSubscriptionModal
				isOpen={open}
				onClose={handleCloseModal}
			/>
		</div>
	);
}