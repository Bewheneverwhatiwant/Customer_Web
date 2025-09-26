"use client";
import React from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Value = CalendarProps["value"];

interface CustomCalendarProps {
	value: Value;
	onChange: (value: Value) => void;
}

export default function CustomCalendar({ value, onChange }: CustomCalendarProps) {
	return (

		<Calendar onChange={onChange} value={value} locale="ko-KR" />
	);
}
