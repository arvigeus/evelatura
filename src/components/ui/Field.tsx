"use client";
import {
	composeRenderProps,
	type FieldErrorProps,
	Group,
	type GroupProps,
	type InputProps,
	type LabelProps,
	FieldError as RACFieldError,
	Input as RACInput,
	Label as RACLabel,
	Text,
	type TextProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

export function Label(props: LabelProps) {
	return (
		<RACLabel
			{...props}
			className={twMerge(
				"w-fit cursor-default font-medium text-neutral text-sm",
				props.className,
			)}
		/>
	);
}

export function Description(props: TextProps) {
	return (
		<Text
			{...props}
			slot="description"
			className={twMerge("text-neutral text-sm", props.className)}
		/>
	);
}

export function FieldError(props: FieldErrorProps) {
	return (
		<RACFieldError
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"text-error text-sm forced-colors:text-[Mark]",
			)}
		/>
	);
}

export const fieldBorderStyles = tv({
	variants: {
		isFocusWithin: {
			false: "border-neutral/30 forced-colors:border-[ButtonBorder]",
			true: "border-accent forced-colors:border-[Highlight]",
		},
		isInvalid: {
			true: "border-error forced-colors:border-[Mark]",
		},
		isDisabled: {
			true: "border-neutral/20 forced-colors:border-[GrayText]",
		},
	},
});

export const fieldGroupStyles = tv({
	extend: focusRing,
	base: "group flex h-9 items-center overflow-hidden rounded-xl border-2 bg-surface forced-colors:bg-[Field]",
	variants: fieldBorderStyles.variants,
});

export function FieldGroup(props: GroupProps) {
	return (
		<Group
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				fieldGroupStyles({ ...renderProps, className }),
			)}
		/>
	);
}

export function Input(props: InputProps) {
	return (
		<RACInput
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"min-w-0 flex-1 bg-surface px-2 py-1.5 text-dark text-sm outline-0 disabled:text-neutral",
			)}
		/>
	);
}
