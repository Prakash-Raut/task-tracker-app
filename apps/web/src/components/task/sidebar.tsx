"use client";

import { CheckCircle } from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Logout } from "../logout";

interface TaskSidebarProps {
	stats: {
		total: number;
		completed: number;
		active: number;
		pending: number;
	};
}

export function TaskSidebar({ stats }: TaskSidebarProps) {
	return (
		<aside className="flex w-full flex-col justify-between border-border border-b bg-card p-4 sm:p-5 md:p-6 lg:w-80 lg:border-r lg:border-b-0 xl:w-96">
			<div className="space-y-6 sm:space-y-8">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary">
						<CheckCircle className="h-5 w-5 text-white" />
					</div>
					<span className="hidden font-bold text-foreground text-lg sm:inline">
						TaskFlow
					</span>
				</div>

				<div className="grid grid-cols-2 gap-3 px-2 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs sm:grid-cols-2 sm:gap-4 sm:px-4 lg:grid-cols-1 lg:px-0 xl:grid-cols-2 dark:*:data-[slot=card]:bg-card">
					<Card className="@container/card">
						<CardHeader className="p-4 sm:p-6">
							<CardDescription className="text-xs sm:text-sm">
								Active Tasks
							</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-xl tabular-nums sm:text-2xl">
								{stats.active}
							</CardTitle>
						</CardHeader>
					</Card>
					<Card className="@container/card">
						<CardHeader className="p-4 sm:p-6">
							<CardDescription className="text-xs sm:text-sm">
								Finished Tasks
							</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-xl tabular-nums sm:text-2xl">
								{stats.completed}
							</CardTitle>
						</CardHeader>
					</Card>
					<Card className="@container/card">
						<CardHeader className="p-4 sm:p-6">
							<CardDescription className="text-xs sm:text-sm">
								Pending Tasks
							</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-xl tabular-nums sm:text-2xl">
								{stats.pending}
							</CardTitle>
						</CardHeader>
					</Card>
					<Card className="@container/card">
						<CardHeader className="p-4 sm:p-6">
							<CardDescription className="text-xs sm:text-sm">
								Total Tasks
							</CardDescription>
							<CardTitle className="font-semibold @[250px]/card:text-3xl text-xl tabular-nums sm:text-2xl">
								{stats.total}
							</CardTitle>
						</CardHeader>
					</Card>
				</div>
			</div>

			<div className="mt-6">
				<Logout />
			</div>
		</aside>
	);
}
