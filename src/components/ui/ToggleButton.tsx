"use client";
import {
	composeRenderProps,
	ToggleButton as RACToggleButton,
	type ToggleButtonProps as RACToggleButtonProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

export interface ToggleButtonProps extends RACToggleButtonProps {
	/** @default 'accent' */
	variant?: "accent" | "primary" | "destructive";
	/** @default 'md' */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const styles = tv({
	extend: focusRing,
	base: "cursor-default border text-center font-medium shadow-sm transition forced-color-adjust-none [&:has(svg:only-child)]:px-2",
	variants: {
		variant: {
			accent: "",
			primary: "",
			destructive: "",
		},
		size: {
			xs: "rounded-lg px-2 py-1 text-xs",
			sm: "rounded-lg px-3 py-1.5 text-sm",
			md: "rounded-xl px-5 py-2 text-sm",
			lg: "rounded-xl px-6 py-3 text-base",
			xl: "rounded-2xl px-8 py-4 text-lg",
		},
		isSelected: {
			false: "border-neutral/30 bg-muted text-dark hover:bg-muted/80",
			true: "",
		},
		isDisabled: {
			true: "cursor-not-allowed opacity-50 forced-colors:text-[GrayText]!",
		},
	},
	compoundVariants: [
		{
			variant: "accent",
			isSelected: true,
			className: "border-accent bg-accent text-white hover:bg-accent-hover",
		},
		{
			variant: "primary",
			isSelected: true,
			className: "border-primary bg-primary text-white hover:bg-primary-hover",
		},
		{
			variant: "destructive",
			isSelected: true,
			className: "border-error bg-error text-white hover:opacity-90",
		},
	],
	defaultVariants: {
		variant: "accent",
		size: "md",
	},
});

export function ToggleButton({
	variant = "accent",
	size = "md",
	...props
}: ToggleButtonProps) {
	return (
		<RACToggleButton
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				styles({ ...renderProps, variant, size, className }),
			)}
		/>
	);
}
