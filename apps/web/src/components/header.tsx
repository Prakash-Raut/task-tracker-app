"use client";
import Link from "next/link";
import { ModeToggle } from "./general/mode-toggle";

export default function Header() {
	const links = [{ to: "/", label: "Home" }] as const;

	return (
		<div>
			<div className="flex flex-row items-center justify-between px-3 py-2 sm:px-4 sm:py-3 md:px-6">
				<nav className="flex gap-3 text-base sm:gap-4 sm:text-lg">
					{links.map(({ to, label }) => {
						return (
							<Link key={to} href={to} className="hover:underline">
								{label}
							</Link>
						);
					})}
				</nav>
				<div className="flex items-center gap-1.5 sm:gap-2">
					<ModeToggle />
					{/* <UserMenu /> */}
				</div>
			</div>
			<hr />
		</div>
	);
}
