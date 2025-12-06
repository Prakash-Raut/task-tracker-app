"use client";

import { LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Logout() {
	const { data: session, isPending } = authClient.useSession();
	return (
		<div className="flex items-center gap-3 rounded-xl border border-border bg-linear-to-r from-primary/5 to-card px-3 py-2 shadow-sm dark:bg-card">
			<div className="flex w-full min-w-0 items-center gap-2">
				<Avatar className="h-9 w-9 rounded-lg border border-primary/10 shadow-xs grayscale">
					<AvatarImage
						src={session?.user.image ?? undefined}
						alt={session?.user.name ?? "User"}
					/>
					<AvatarFallback className="rounded-lg font-bold uppercase">
						{session?.user?.name
							? session.user.name
									.split(" ")
									.map((n) => n[0])
									.join("")
									.slice(0, 2)
							: "CN"}
					</AvatarFallback>
				</Avatar>
				<div className="flex min-w-0 flex-col">
					<span className="truncate font-semibold text-foreground">
						{session?.user.name || "Your Account"}
					</span>
					<span className="truncate text-muted-foreground text-xs">
						{session?.user.email}
					</span>
				</div>
			</div>
			<Button
				variant="ghost"
				size="icon"
				className="rounded-lg text-rose-600 transition-colors hover:bg-rose-100 dark:hover:bg-rose-900/30"
				onClick={() => authClient.signOut()}
				disabled={isPending}
				title="Sign out"
			>
				<LogOutIcon className="h-5 w-5" />
			</Button>
		</div>
	);
}
