"use client";
import { XIcon } from "lucide-react";
import { createContext, useContext } from "react";
import {
	Tag as AriaTag,
	TagGroup as AriaTagGroup,
	type TagGroupProps as AriaTagGroupProps,
	type TagProps as AriaTagProps,
	Button,
	composeRenderProps,
	TagList,
	type TagListProps,
	Text,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { Description, Label } from "./Field";
import { focusRing } from "./utils";

const colors = {
	accent: "bg-accent/10 text-accent border-accent/20 hover:border-accent/40",
	primary:
		"bg-primary/10 text-primary border-primary/20 hover:border-primary/40",
	secondary:
		"bg-secondary/50 text-dark border-secondary hover:border-secondary",
	green:
		"bg-green-500/10 text-green-700 border-green-500/20 hover:border-green-500/40",
	yellow:
		"bg-yellow-500/10 text-yellow-700 border-yellow-500/20 hover:border-yellow-500/40",
	red: "bg-red-500/10 text-red-700 border-red-500/20 hover:border-red-500/40",
};

type Color = keyof typeof colors;
const ColorContext = createContext<Color>("accent");

const tagStyles = tv({
	extend: focusRing,
	base: "flex max-w-fit cursor-default items-center gap-1 rounded-full border px-3 py-0.5 text-xs transition",
	variants: {
		color: {
			accent: "",
			primary: "",
			secondary: "",
			green: "",
			yellow: "",
			red: "",
		},
		allowsRemoving: {
			true: "pr-1",
		},
		isSelected: {
			true: "border-transparent bg-accent text-white forced-color-adjust-none forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
		},
		isDisabled: {
			true: "bg-gray-100 text-gray-300 forced-colors:text-[GrayText]",
		},
	},
	compoundVariants: (Object.keys(colors) as Color[]).map((color) => ({
		isSelected: false,
		isDisabled: false,
		color,
		class: colors[color],
	})),
});

export interface TagGroupProps<T>
	extends Omit<AriaTagGroupProps, "children">,
		Pick<TagListProps<T>, "items" | "children" | "renderEmptyState"> {
	/** @default 'accent' */
	color?: Color;
	label?: string;
	description?: string;
	errorMessage?: string;
}

export interface TagProps extends AriaTagProps {
	/** @default 'accent' */
	color?: Color;
}

export function TagGroup<T extends object>({
	label,
	description,
	errorMessage,
	items,
	children,
	renderEmptyState,
	...props
}: TagGroupProps<T>) {
	return (
		<AriaTagGroup
			{...props}
			className={twMerge("flex flex-col gap-1", props.className)}
		>
			<Label>{label}</Label>
			<ColorContext.Provider value={props.color || "accent"}>
				<TagList
					items={items}
					renderEmptyState={renderEmptyState}
					className="flex flex-wrap gap-1"
				>
					{children}
				</TagList>
			</ColorContext.Provider>
			{description && <Description>{description}</Description>}
			{errorMessage && (
				<Text slot="errorMessage" className="text-red-600 text-sm">
					{errorMessage}
				</Text>
			)}
		</AriaTagGroup>
	);
}

const removeButtonStyles = tv({
	extend: focusRing,
	base: "flex cursor-default items-center justify-center rounded-full pressed:bg-black/20 p-0.5 transition-[background-color] hover:bg-black/10",
});

export function Tag({ children, color, ...props }: TagProps) {
	const textValue = typeof children === "string" ? children : undefined;
	const groupColor = useContext(ColorContext);
	return (
		<AriaTag
			textValue={textValue}
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				tagStyles({ ...renderProps, className, color: color || groupColor }),
			)}
		>
			{({ allowsRemoving }) => (
				<>
					{children}
					{allowsRemoving && (
						<Button slot="remove" className={removeButtonStyles}>
							<XIcon aria-hidden className="h-3 w-3" />
						</Button>
					)}
				</>
			)}
		</AriaTag>
	);
}
