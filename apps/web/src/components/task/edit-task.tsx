"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import * as z from "zod";
import { DueDate } from "@/components/task/due-date";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
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
import { useUpdateTask } from "@/hooks/use-tasks";
import type { Task } from "@/types";

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

type EditTaskProps = {
	task: Task | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function EditTask({ task, open, onOpenChange }: EditTaskProps) {
	const { mutate: updateTask } = useUpdateTask();

	// Compute default values based on task
	const defaultValues = task
		? {
				title: task.title,
				description: task.description || "",
				dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
				priority: task.priority as "low" | "medium" | "high",
			}
		: {
				title: "",
				description: "",
				dueDate: new Date(),
				priority: "medium" as const,
			};

	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			if (!task) return;

			updateTask({
				id: task.id,
				data: {
					title: value.title,
					description: value.description || undefined,
					priority: value.priority as "low" | "medium" | "high",
					dueDate: value.dueDate ? value.dueDate.toISOString() : undefined,
				},
			});
			onOpenChange(false);
		},
	});

	// Update form values when task changes or dialog opens
	useEffect(() => {
		if (task && open) {
			// Convert dueDate string to Date object
			const dueDate = task.dueDate ? new Date(task.dueDate) : new Date();

			// Reset form with new values
			form.reset({
				title: task.title,
				description: task.description || "",
				priority: task.priority,
				dueDate: dueDate,
			});
		}
	}, [task?.id, open, form]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<form
				id="edit-task-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogContent className="w-[calc(100%-1rem)] p-4 sm:max-w-[425px] sm:p-6">
					<DialogHeader>
						<DialogTitle>Edit Task</DialogTitle>
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
												onValueChange={(value) =>
													field.handleChange(value as "low" | "medium" | "high")
												}
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
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" form="edit-task-form">
							Update Task
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
