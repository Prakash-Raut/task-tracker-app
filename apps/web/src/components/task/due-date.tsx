"use client";

import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const formatDate = (date: Date | undefined) => {
	if (!date) {
		return "";
	}

	return date.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});
};

type DueDateProps = {
	value: Date;
	onChange: (date: Date) => void;
	isInvalid: boolean;
};

export function DueDate({ value, onChange }: DueDateProps) {
	const [open, setOpen] = React.useState(false);
	const [inputValue, setInputValue] = React.useState(
		() => formatDate(value) || "In 2 days",
	);

	// Sync inputValue with value prop when it changes
	React.useEffect(() => {
		if (value) {
			setInputValue(formatDate(value));
		}
	}, [value]);

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="date" className="px-1">
				Due Date
			</Label>
			<div className="relative flex gap-2">
				<Input
					id="date"
					value={inputValue}
					placeholder="Tomorrow or next week"
					className="bg-background pr-10"
					onChange={(e) => {
						const text = e.target.value;
						setInputValue(text);

						const parsed = parseDate(text);
						if (parsed) {
							onChange(parsed);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "ArrowDown") {
							e.preventDefault();
							setOpen(true);
						}
					}}
				/>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-picker"
							variant="ghost"
							className="-translate-y-1/2 absolute top-1/2 right-2 size-6"
						>
							<CalendarIcon className="size-3.5" />
							<span className="sr-only">Select date</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto overflow-hidden p-0" align="end">
						<Calendar
							mode="single"
							selected={value}
							captionLayout="dropdown"
							onSelect={(date) => {
								if (date) {
									onChange(date);
								}
								setInputValue(formatDate(date));
								setOpen(false);
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<div className="px-1 text-muted-foreground text-xs sm:text-sm">
				Your task will be due on{" "}
				<span className="font-medium">{formatDate(value)}</span>.
			</div>
		</div>
	);
}
