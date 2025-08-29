"use client";
import {
	composeRenderProps,
	Button as RACButton,
	type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

export interface ButtonProps extends RACButtonProps {
	/** @default 'primary' */
	variant?:
		| "primary"
		| "secondary"
		| "accent"
		| "outline"
		| "destructive"
		| "ghost"
		| "icon";
	/** @default 'md' */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const button = tv({
	extend: focusRing,
	base: "cursor-default border text-center font-medium shadow-sm transition-all duration-200",
	variants: {
		variant: {
			primary:
				"border-primary bg-primary pressed:bg-primary-hover text-white shadow-md hover:bg-primary-hover",
			secondary:
				"border-secondary bg-secondary pressed:bg-secondary-hover text-dark hover:bg-secondary-hover",
			accent:
				"border-accent bg-accent pressed:bg-accent-hover text-white hover:bg-accent-hover",
			outline:
				"border-primary bg-transparent pressed:bg-primary text-primary hover:bg-primary hover:text-white",
			destructive:
				"border-error bg-error pressed:bg-error/90 text-white hover:bg-error/90",
			ghost:
				"border-transparent bg-transparent pressed:bg-muted text-dark hover:bg-muted",
			icon: "flex items-center justify-center border-transparent pressed:bg-muted text-dark hover:bg-muted disabled:bg-transparent",
		},
		size: {
			xs: "rounded-xl px-2 py-1 text-xs",
			sm: "rounded-xl px-3 py-1.5 text-sm",
			md: "rounded-2xl px-5 py-2.5 text-sm",
			lg: "rounded-2xl px-6 py-3 text-base",
			xl: "rounded-3xl px-8 py-4 text-lg",
		},
		isDisabled: {
			true: "cursor-not-allowed opacity-50",
		},
	},
	compoundVariants: [
		{ variant: "icon", size: "xs", className: "rounded-xl p-1" },
		{ variant: "icon", size: "sm", className: "rounded-xl p-1.5" },
		{ variant: "icon", size: "md", className: "rounded-2xl p-2" },
		{ variant: "icon", size: "lg", className: "rounded-2xl p-2.5" },
		{ variant: "icon", size: "xl", className: "rounded-3xl p-3" },
	],
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

export function Button(props: ButtonProps) {
	return (
		<RACButton
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				button({
					...renderProps,
					variant: props.variant,
					size: props.size,
					className,
				}),
			)}
		/>
	);
}
