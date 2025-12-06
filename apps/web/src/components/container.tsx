"use client";

type ContainerProps = {
	children: React.ReactNode;
	sidebar: React.ReactNode;
	header: React.ReactNode;
	search: React.ReactNode;
	filter: React.ReactNode;
};

export function Container({
	children,
	sidebar,
	header,
	search,
	filter,
}: ContainerProps) {
	return (
		<div className="flex min-h-screen w-full flex-col bg-background lg:flex-row">
			{sidebar}
			<main className="flex w-full min-w-0 flex-1 flex-col lg:max-w-[calc(100%-20rem)] xl:max-w-[calc(100%-24rem)]">
				<div>{header}</div>
				<div className="space-y-3 border-border border-b pb-3 sm:space-y-4 sm:pb-4">
					{search}
					{filter}
				</div>
				<div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
					{children}
				</div>
			</main>
		</div>
	);
}
