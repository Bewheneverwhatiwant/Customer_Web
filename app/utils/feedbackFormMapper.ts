// utils/feedbackFormMapper.ts

/**
 * 스윙 폼 데이터를 FormData로 변환
 */
export const mapSwingFormData = (formData: any): FormData => {
	const fd = new FormData();

	fd.append("trainerFeedbackRequestContent", formData.trainerFeedback || "");
	fd.append("positionStartDate", formData.positionStartDate || "");
	fd.append("positionEndDate", formData.positionEndDate || "");
	fd.append("feedbackYear", String(formData.feedbackYear || 0));
	fd.append("feedbackMonth", String(formData.feedbackMonth || 0));
	fd.append("feedbackWeek", String(formData.feedbackWeek || 0));
	fd.append("positionHoldingTime", formData.positionHoldingTime || "");
	fd.append("position", formData.position || "LONG");
	fd.append("winLossRatio", formData.winLossRatio || "");
	fd.append("subFrame", formData.subFrame || "");
	fd.append("courseStatus", formData.courseStatus || "BEFORE_COMPLETION");
	fd.append("directionFrame", formData.directionFrame || "");
	fd.append("membershipLevel", formData.membershipLevel || "BASIC");
	fd.append("pnl", String(formData.pl || 0));
	if (formData.screenshot) fd.append("screenshotFiles", formData.screenshot);
	fd.append("riskTaking", String(formData.risk || 0));
	fd.append("entryPoint1", formData.entryPoint1 || "REVERSE");
	fd.append("entryPoint2", formData.entryPoint2 || new Date().toISOString());
	fd.append("entryPoint3", formData.entryPoint3 || new Date().toISOString());
	fd.append("mainFrame", formData.mainFrame || "");
	fd.append("grade", formData.grade || "S_PLUS");
	fd.append("trendAnalysis", formData.trendAnalysis || "");
	fd.append("tradingReview", formData.tradingReview || "");
	fd.append("requestDate", formData.requestDate || new Date().toISOString().split("T")[0]);
	fd.append("category", formData.category || "string");

	// preCourseFeedbackDetail JSON
	fd.append(
		"preCourseFeedbackDetail",
		JSON.stringify({
			rnr: formData.rr || 0,
			operatingFundsRatio: formData.operatingFundsRatio || 0,
			entryPrice: formData.entryPrice || 0,
			exitPrice: formData.exitPrice || 0,
			settingStopLoss: formData.settingStopLoss || 0,
			settingTakeProfit: formData.settingTakeProfit || 0,
			positionStartReason: formData.positionStartReason || "",
			positionEndReason: formData.positionEndReason || "",
		})
	);

	return fd;
};

/**
 * 데이 폼 데이터를 FormData로 변환
 */
export const mapDayFormData = (formData: any): FormData => {
	const fd = new FormData();

	fd.append("trainerFeedbackRequestContent", formData.trainerFeedback || "");
	fd.append("positionHoldingTime", formData.positionHoldingTime || "");
	fd.append("position", formData.position || "LONG");
	fd.append("directionFrameExists", String(formData.directionFrameExists || true));
	fd.append("winLossRatio", formData.winLossRatio || "");
	fd.append("subFrame", formData.subFrame || "");
	fd.append("courseStatus", formData.courseStatus || "BEFORE_COMPLETION");
	fd.append("directionFrame", formData.directionFrame || "");
	fd.append("membershipLevel", formData.membershipLevel || "BASIC");
	fd.append("pnl", String(formData.pl || 0));
	if (formData.screenshot) fd.append("screenshotFiles", formData.screenshot);
	fd.append("riskTaking", String(formData.risk || 0));
	fd.append("entryPoint1", formData.entryPoint1 || "REVERSE");
	fd.append("entryPoint2", formData.entryPoint2 || new Date().toISOString());
	fd.append("mainFrame", formData.mainFrame || "");
	fd.append("leverage", String(formData.leverage || 0));
	fd.append("grade", formData.grade || "S_PLUS");
	fd.append("trendAnalysis", formData.trendAnalysis || "");
	fd.append("tradingReview", formData.tradingReview || "");
	fd.append("requestDate", formData.requestDate || new Date().toISOString().split("T")[0]);
	fd.append("category", formData.category || "string");

	// preCourseFeedbackDetail JSON
	fd.append(
		"preCourseFeedbackDetail",
		JSON.stringify({
			rnr: formData.rr || 0,
			operatingFundsRatio: formData.operatingFundsRatio || 0,
			entryPrice: formData.entryPrice || 0,
			exitPrice: formData.exitPrice || 0,
			settingStopLoss: formData.settingStopLoss || 0,
			settingTakeProfit: formData.settingTakeProfit || 0,
			positionStartReason: formData.positionStartReason || "",
			positionEndReason: formData.positionEndReason || "",
		})
	);

	return fd;
};

/**
 * 스켈핑 폼 데이터를 FormData로 변환
 */
export const mapScalpingFormData = (formData: any): FormData => {
	const fd = new FormData();

	fd.append("trainerFeedbackRequestContent", formData.trainerFeedback || "");
	fd.append("dailyTradingCount", String(formData.dailyTradingCount || 0));
	fd.append("positionHoldingTime", formData.positionHoldingTime || "");
	fd.append("courseStatus", formData.courseStatus || "BEFORE_COMPLETION");
	fd.append("membershipLevel", formData.membershipLevel || "BASIC");
	if (formData.screenshot) fd.append("screenshotFiles", formData.screenshot);
	fd.append("riskTaking", String(formData.risk || 0));
	fd.append("leverage", String(formData.leverage || 0));
	fd.append("totalProfitMarginPerTrades", String(formData.totalProfitTrades || 0));
	fd.append("trendAnalysis", formData.trendAnalysis || "");
	fd.append("requestDate", formData.requestDate || new Date().toISOString().split("T")[0]);
	fd.append("category", formData.category || "string");
	fd.append("totalPositionTakingCount", String(formData.totalPositions || 0));

	// preCourseFeedbackDetail JSON
	fd.append(
		"preCourseFeedbackDetail",
		JSON.stringify({
			rnr: formData.rr || 0,
			operatingFundsRatio: formData.operatingFundsRatio || 0,
			entryPrice: formData.entryPrice || 0,
			exitPrice: formData.exitPrice || 0,
			settingStopLoss: formData.settingStopLoss || 0,
			settingTakeProfit: formData.settingTakeProfit || 0,
			positionStartReason: formData.positionStartReason || "",
			positionEndReason: formData.positionEndReason || "",
		})
	);

	return fd;
};
