"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import * as z from "zod";
import { DueDate } from "@/components/task/due-date";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTask } from "@/hooks/use-tasks";

const formSchema = z.object({
	title: z
		.string()
		.trim()
		.min(1, "Task title must be at least 1 characters.")
		.max(32, "Task title must be at most 32 characters."),
	description: z
		.string()
		.trim()
		.max(100, "Task description must be at most 100 characters."),
	dueDate: z.date(),
	priority: z.enum(["low", "medium", "high"]),
});

const priorities = [
	{ label: "Low", value: "low" },
	{ label: "Medium", value: "medium" },
	{ label: "High", value: "high" },
] as const;

export function AddTask() {
	const [open, setOpen] = useState(false);
	const { mutate: addTask } = useCreateTask();
	const form = useForm({
		defaultValues: {
			title: "",
			description: "",
			dueDate: new Date(),
			priority: "medium",
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			addTask({
				title: value.title,
				description: value.description || undefined,
				priority: value.priority as "low" | "medium" | "high",
				dueDate: value.dueDate ? value.dueDate.toISOString() : undefined,
			});
			form.reset();
			setOpen(false);
		},
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<form
				id="task-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogTrigger asChild>
					<Button
						size="sm"
						className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
					>
						Add Task
					</Button>
				</DialogTrigger>
				<DialogContent className="w-[calc(100%-1rem)] p-4 sm:max-w-[425px] sm:p-6">
					<DialogHeader>
						<DialogTitle>Add New Task</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						<FieldGroup>
							<form.Field
								name="title"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Task Title</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="What needs to be done?"
												autoComplete="off"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name="description"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Description</FieldLabel>
											<Textarea
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												placeholder="Add details..."
												className="min-h-[80px]"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
							<form.Field
								name="priority"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<FieldSet>
											<FieldLegend>Priority</FieldLegend>
											<RadioGroup
												name={field.name}
												value={field.state.value}
												onValueChange={field.handleChange}
												className="flex flex-row flex-nowrap gap-2"
											>
												{priorities.map((priority) => (
													<FieldLabel
														key={priority.value}
														htmlFor={`${field.name}-${priority.value}`}
													>
														<Field
															orientation="horizontal"
															data-invalid={isInvalid}
														>
															<FieldContent>
																<FieldTitle>{priority.label}</FieldTitle>
															</FieldContent>
															<RadioGroupItem
																value={priority.value}
																id={`${field.name}-${priority.value}`}
																aria-invalid={isInvalid}
																className="hidden"
															/>
														</Field>
													</FieldLabel>
												))}
											</RadioGroup>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</FieldSet>
									);
								}}
							/>
							<form.Field
								name="dueDate"
								children={(field) => (
									<DueDate
										value={field.state.value}
										onChange={field.handleChange}
										isInvalid={
											!field.state.meta.isValid && field.state.meta.isTouched
										}
									/>
								)}
							/>
						</FieldGroup>
					</div>
					<DialogFooter>
						<Button type="submit" form="task-form">
							Add Task
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
