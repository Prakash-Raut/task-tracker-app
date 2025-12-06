"use client";

import { Edit2Icon, ListIcon, SearchIcon, Trash2Icon } from "lucide-react";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";
import type { Task } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { AddTask } from "./add-task";

const priorityColors: Record<string, string> = {
	high: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/50",
	medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/50",
	low: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/50",
};

type TaskSearchProps = {
	search: string;
	setSearch: (search: string) => void;
};

export const TaskSearch = ({ search, setSearch }: TaskSearchProps) => {
	return (
		<div className="px-3 sm:px-4">
			<div className="relative">
				<SearchIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
				<Input
					type="text"
					placeholder="Search tasks..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full py-2 pr-4 pl-10 text-sm sm:text-base"
				/>
			</div>
		</div>
	);
};

type TaskStatusFilterProps = {
	filter: "all" | "todo" | "in_progress" | "done";
	setFilter: (filter: "all" | "todo" | "in_progress" | "done") => void;
};

export function TaskStatusFilter({ filter, setFilter }: TaskStatusFilterProps) {
	return (
		<div className="flex flex-wrap gap-1.5 px-3 sm:gap-2 sm:px-4">
			<Button
				variant={filter === "all" ? "default" : "outline"}
				onClick={() => setFilter("all")}
				size="sm"
				className="h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm"
			>
				All
			</Button>
			<Button
				variant="ghost"
				className={cn(
					filter === "todo"
						? "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
				onClick={() => setFilter("todo")}
				size="sm"
			>
				Todo
			</Button>
			<Button
				variant="ghost"
				className={cn(
					filter === "in_progress"
						? "bg-primary/10 text-primary"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
				onClick={() => setFilter("in_progress")}
				size="sm"
			>
				Active
			</Button>
			<Button
				variant="ghost"
				className={cn(
					filter === "done"
						? "bg-green-50 text-green-600 dark:bg-green-900/50 dark:text-green-400"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
				onClick={() => setFilter("done")}
				size="sm"
			>
				Completed
			</Button>
		</div>
	);
}

type TaskPriorityFilterProps = {
	filter: "all" | "low" | "medium" | "high";
	setFilter: (filter: "all" | "low" | "medium" | "high") => void;
};

export function TaskPriorityFilter({
	filter,
	setFilter,
}: TaskPriorityFilterProps) {
	return (
		<div className="flex flex-wrap gap-1.5 px-3 sm:gap-2 sm:px-4">
			<Button
				variant={filter === "all" ? "default" : "outline"}
				onClick={() => setFilter("all")}
				size="sm"
				className="h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm"
			>
				All Priorities
			</Button>
			<Button
				variant="ghost"
				onClick={() => setFilter("low")}
				size="sm"
				className={cn(
					filter === "low"
						? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
			>
				Low
			</Button>
			<Button
				variant="ghost"
				onClick={() => setFilter("medium")}
				size="sm"
				className={cn(
					filter === "medium"
						? "bg-amber-50 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
			>
				Medium
			</Button>
			<Button
				variant="ghost"
				onClick={() => setFilter("high")}
				size="sm"
				className={cn(
					filter === "high"
						? "bg-rose-50 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400"
						: "bg-background text-foreground",
					"h-7 px-2 text-xs sm:h-8 sm:px-3 sm:text-sm",
				)}
			>
				High
			</Button>
		</div>
	);
}

// Combined filter component for backward compatibility
type TaskFilterProps = {
	statusFilter: "all" | "todo" | "in_progress" | "done";
	setStatusFilter: (filter: "all" | "todo" | "in_progress" | "done") => void;
	priorityFilter: "all" | "low" | "medium" | "high";
	setPriorityFilter: (filter: "all" | "low" | "medium" | "high") => void;
};

export function TaskFilter({
	statusFilter,
	setStatusFilter,
	priorityFilter,
	setPriorityFilter,
}: TaskFilterProps) {
	return (
		<div className="flex flex-col gap-3 px-3 sm:flex-row sm:gap-4 sm:px-4">
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<span className="font-medium text-muted-foreground text-xs sm:text-sm">
					Status
				</span>
				<TaskStatusFilter filter={statusFilter} setFilter={setStatusFilter} />
			</div>
			<div className="flex flex-col gap-1.5 sm:gap-2">
				<span className="font-medium text-muted-foreground text-xs sm:text-sm">
					Priority
				</span>
				<TaskPriorityFilter
					filter={priorityFilter}
					setFilter={setPriorityFilter}
				/>
			</div>
		</div>
	);
}

export function TaskHeader() {
	return (
		<div className="w-full p-3 sm:p-4 md:p-6">
			<div className="flex flex-col gap-3 sm:gap-4">
				<div className="flex items-center justify-between gap-2 sm:gap-4">
					<div>
						<h1 className="font-bold text-foreground text-xl sm:text-2xl md:text-3xl">
							Tasks
						</h1>
					</div>
					<AddTask />
				</div>
			</div>
		</div>
	);
}

type TaskListProps = {
	tasks: Task[];
	isLoading: boolean;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

export function TaskList({
	tasks,
	isLoading,
	onEdit,
	onDelete,
}: TaskListProps) {
	if (isLoading) {
		return <TaskLoading />;
	}
	if (tasks.length === 0) {
		return <TaskEmpty />;
	}
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
			{tasks?.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					onEdit={(id) => onEdit(id)}
					onDelete={(id) => onDelete(id)}
				/>
			))}
		</div>
	);
}

type TaskItemProps = {
	task: Task;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
	const priorityColor = priorityColors[task.priority] || priorityColors.medium;
	const priorityLabel =
		task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "No due date";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	return (
		<Card className="group flex w-full flex-row gap-2 px-4">
			<div>
				<Checkbox
					id={task.id}
					className="mt-1 h-5 w-5 cursor-pointer rounded-xl"
					defaultChecked={task.status === "done"}
				/>
			</div>
			<div className="w-full">
				<CardHeader className="p-0">
					<CardTitle
						className={cn(
							task.status === "done" ? "line-through" : "",
							"line-clamp-2 text-base sm:text-lg",
						)}
					>
						{task.title}
					</CardTitle>
					{task.description && (
						<CardDescription
							className={cn(
								task.status === "done" ? "line-through" : "",
								"mt-1 line-clamp-2 text-sm sm:mt-2",
							)}
						>
							{task.description}
						</CardDescription>
					)}
					<CardAction className="mt-3 flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:mt-4 sm:gap-2">
						<Button
							variant="ghost"
							onClick={() => onEdit(task.id)}
							size="sm"
							className="h-8 w-8 p-2 transition-colors"
						>
							<Edit2Icon className="size-3.5 sm:size-4" />
						</Button>
						<Button
							variant="ghost"
							onClick={() => onDelete(task.id)}
							size="sm"
							className="h-8 w-8 p-2 transition-colors"
						>
							<Trash2Icon className="size-3.5 sm:size-4" />
						</Button>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex flex-wrap items-center gap-1.5 px-0 pt-4 sm:gap-2">
					<Badge
						className={`whitespace-nowrap font-medium text-xs sm:text-sm ${priorityColor}`}
					>
						{priorityLabel}
					</Badge>
					{task.dueDate && (
						<Badge variant="outline" className="text-xs sm:text-sm">
							<time
								dateTime={task.dueDate}
								className="font-medium text-muted-foreground text-xs sm:text-sm"
							>
								📅 {formatDate(task.dueDate)}
							</time>
						</Badge>
					)}
				</CardFooter>
			</div>
		</Card>
	);
}

export function TaskLoading() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 xl:grid-cols-3">
			{[1, 2, 3, 4, 5, 6].map((i) => (
				<Card key={i} className="w-full">
					<CardHeader className="p-4 sm:p-6">
						<Skeleton className="h-5 w-3/4 rounded sm:h-6" />
						<Skeleton className="mt-2 h-4 w-full rounded" />
						<Skeleton className="mt-2 h-4 w-2/3 rounded" />
					</CardHeader>
					<CardFooter className="flex gap-2 p-4 pt-0 sm:p-6">
						<Skeleton className="h-6 w-16 rounded-full" />
						<Skeleton className="h-6 w-20 rounded-full" />
					</CardFooter>
				</Card>
			))}
		</div>
	);
}

export function TaskEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<ListIcon />
				</EmptyMedia>
				<EmptyTitle>No tasks found</EmptyTitle>
				<EmptyDescription>
					Create your first task to get started
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<AddTask />
			</EmptyContent>
		</Empty>
	);
}
