"use client";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import {
	Tree as AriaTree,
	TreeItem as AriaTreeItem,
	TreeItemContent as AriaTreeItemContent,
	type TreeItemContentProps as AriaTreeItemContentProps,
	Button,
	type TreeItemProps,
	type TreeProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

const itemStyles = tv({
	extend: focusRing,
	base: "group -mb-px -outline-offset-2 relative flex cursor-default select-none gap-3 border-transparent border-y px-3 py-2 text-gray-900 text-sm first:border-t-0 last:mb-0 last:border-b-0 dark:border-y-zinc-700 dark:text-zinc-200",
	variants: {
		isSelected: {
			false: "hover:bg-gray-100 dark:hover:bg-zinc-700/60",
			true: "z-20 border-y-blue-200 bg-blue-100 hover:bg-blue-200 dark:border-y-blue-900 dark:bg-blue-700/30 dark:hover:bg-blue-700/40",
		},
		isDisabled: {
			true: "z-10 text-slate-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
		},
	},
});

export function Tree<T extends object>({ children, ...props }: TreeProps<T>) {
	return (
		<AriaTree
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"relative overflow-auto rounded-lg border border-gray-200 dark:border-zinc-600",
			)}
		>
			{children}
		</AriaTree>
	);
}

export function TreeItem(props: TreeItemProps) {
	return <AriaTreeItem className={itemStyles} {...props} />;
}
interface TreeItemContentProps
	extends Omit<AriaTreeItemContentProps, "children"> {
	children: ReactNode;
}

const expandButton = tv({
	extend: focusRing,
	base: "flex h-8 w-8 shrink-0 cursor-default items-center justify-center rounded-lg text-start",
	variants: {
		isDisabled: {
			true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
		},
	},
});

const chevron = tv({
	base: "h-5 w-5 text-gray-500 transition-transform duration-200 ease-in-out dark:text-gray-400",
	variants: {
		isExpanded: {
			true: "rotate-90 transform",
		},
		isDisabled: {
			true: "text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]",
		},
	},
});

export function TreeItemContent({ children, ...props }: TreeItemContentProps) {
	return (
		<AriaTreeItemContent {...props}>
			{({
				selectionMode,
				selectionBehavior,
				hasChildItems,
				isExpanded,
				isDisabled,
			}) => (
				<div className={"flex items-center"}>
					{selectionMode === "multiple" && selectionBehavior === "toggle" && (
						<Checkbox slot="selection" />
					)}
					<div className="w-[calc(calc(var(--tree-item-level)_-_1)_*_calc(var(--spacing)_*_3))] shrink-0" />
					{hasChildItems ? (
						<Button slot="chevron" className={expandButton({ isDisabled })}>
							<ChevronRight
								aria-hidden
								className={chevron({ isExpanded, isDisabled })}
							/>
						</Button>
					) : (
						<div className="h-8 w-8 shrink-0" />
					)}
					{children}
				</div>
			)}
		</AriaTreeItemContent>
	);
}
