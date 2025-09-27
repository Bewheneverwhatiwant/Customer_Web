import { UserStatus } from "../mocks/status";

export type InvestmentType = "스윙" | "데이" | "스켈핑";
export type CompletionStatus = "무료" | "완강전" | "완강후";

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: UserStatus;
  investmentType: InvestmentType;
  completion: CompletionStatus;
};