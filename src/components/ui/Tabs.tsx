"use client";
import {
	composeRenderProps,
	Tab as RACTab,
	TabList as RACTabList,
	TabPanel as RACTabPanel,
	Tabs as RACTabs,
	type TabListProps,
	type TabPanelProps,
	type TabProps,
	type TabsProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

const tabsStyles = tv({
	base: "w-full",
});

export interface CustomTabsProps extends TabsProps {
	variant?: "default" | "underline";
}

export function Tabs({ variant = "default", ...props }: CustomTabsProps) {
	return (
		<RACTabs
			{...props}
			className={composeRenderProps(props.className, (className) =>
				tabsStyles({ className }),
			)}
		/>
	);
}

const tabListStyles = tv({
	base: [
		"inline-flex h-10 items-center justify-center rounded-md p-1",
		"text-dark",
	],
	variants: {
		variant: {
			default: "bg-muted",
			underline:
				"h-auto rounded-none border-secondary/20 border-b bg-transparent p-0",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface CustomTabListProps<T extends object> extends TabListProps<T> {
	variant?: "default" | "underline";
}

export function TabList<T extends object>({
	variant = "default",
	...props
}: CustomTabListProps<T>) {
	return (
		<RACTabList
			{...props}
			className={composeRenderProps(props.className, (className) =>
				tabListStyles({ variant, className }),
			)}
		/>
	);
}

const tabProps = tv({
	extend: focusRing,
	base: [
		"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5",
		"font-medium text-dark text-sm transition-all",
		"disabled:pointer-events-none disabled:opacity-50",
	],
	variants: {
		variant: {
			default: [
				"hover:bg-surface/50",
				"selected:bg-surface selected:text-dark selected:shadow-sm",
			],
			underline: [
				"rounded-none border-transparent border-b-2 px-4 py-2",
				"selected:border-accent selected:text-accent",
			],
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface CustomTabProps extends TabProps {
	variant?: "default" | "underline";
}

export function Tab({ variant = "default", ...props }: CustomTabProps) {
	return (
		<RACTab
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				tabProps({
					...renderProps,
					variant,
					className,
				}),
			)}
		/>
	);
}

const tabPanelStyles = tv({
	extend: focusRing,
	base: [
		"mt-2 focus-visible:outline-none",
		"focus-visible:ring-2 focus-visible:ring-accent/20 focus-visible:ring-offset-2",
	],
});

export function TabPanel(props: TabPanelProps) {
	return (
		<RACTabPanel
			{...props}
			className={composeRenderProps(props.className, (className) =>
				tabPanelStyles({ className }),
			)}
		/>
	);
}
