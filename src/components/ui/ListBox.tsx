"use client";
import { Check } from "lucide-react";
import {
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	type ListBoxProps as AriaListBoxProps,
	Collection,
	composeRenderProps,
	Header,
	type ListBoxItemProps,
	ListBoxSection,
	type SectionProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

interface ListBoxProps<T>
	extends Omit<AriaListBoxProps<T>, "layout" | "orientation"> {}

export function ListBox<T extends object>({
	children,
	...props
}: ListBoxProps<T>) {
	return (
		<AriaListBox
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"rounded-xl border border-neutral/30 p-1 outline-0",
			)}
		>
			{children}
		</AriaListBox>
	);
}

export const itemStyles = tv({
	extend: focusRing,
	base: "group relative flex cursor-default select-none items-center gap-8 rounded-lg px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none",
	variants: {
		isSelected: {
			false: "-outline-offset-2 text-dark hover:bg-muted",
			true: "-outline-offset-4 bg-accent text-white outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none",
		},
		isDisabled: {
			true: "text-neutral forced-colors:text-[GrayText]",
		},
	},
});

export function ListBoxItem(props: ListBoxItemProps) {
	const textValue =
		props.textValue ||
		(typeof props.children === "string" ? props.children : undefined);
	return (
		<AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
			{composeRenderProps(props.children, (children) => (
				<>
					{children}
					<div className="absolute right-4 bottom-0 left-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
				</>
			))}
		</AriaListBoxItem>
	);
}

export const dropdownItemStyles = tv({
	base: "group flex cursor-default select-none items-center gap-4 rounded-lg py-2 pr-1 pl-3 text-sm outline outline-0 forced-color-adjust-none",
	variants: {
		isDisabled: {
			false: "text-dark",
			true: "text-neutral forced-colors:text-[GrayText]",
		},
		isFocused: {
			true: "bg-accent text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
		},
	},
	compoundVariants: [
		{
			isFocused: false,
			isOpen: true,
			className: "bg-muted",
		},
	],
});

export function DropdownItem(props: ListBoxItemProps) {
	const textValue =
		props.textValue ||
		(typeof props.children === "string" ? props.children : undefined);
	return (
		<AriaListBoxItem
			{...props}
			textValue={textValue}
			className={dropdownItemStyles}
		>
			{composeRenderProps(props.children, (children, { isSelected }) => (
				<>
					<span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
						{children}
					</span>
					<span className="flex w-5 items-center">
						{isSelected && <Check className="h-4 w-4" />}
					</span>
				</>
			))}
		</AriaListBoxItem>
	);
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
	title?: string;
	items?: T[];
}

export function DropdownSection<T extends object>(
	props: DropdownSectionProps<T>,
) {
	return (
		<ListBoxSection className="first:-mt-[5px] after:block after:h-[5px] after:content-['']">
			<Header className="-top-[5px] -mt-px -mx-1 sticky z-10 truncate border-y border-y-neutral/20 bg-muted/60 px-4 py-1 font-semibold text-neutral text-sm backdrop-blur-md supports-[-moz-appearance:none]:bg-muted [&+*]:mt-1">
				{props.title}
			</Header>
			<Collection items={props.items}>{props.children}</Collection>
		</ListBoxSection>
	);
}
