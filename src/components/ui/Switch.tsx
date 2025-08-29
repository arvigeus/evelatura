"use client";
import type { ReactNode } from "react";
import {
	Switch as AriaSwitch,
	type SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
	children: ReactNode;
	/** @default 'accent' */
	variant?: "accent" | "primary" | "destructive";
	/** @default 'md' */
	size?: "sm" | "md" | "lg";
}

const track = tv({
	extend: focusRing,
	base: "flex shrink-0 cursor-default items-center rounded-full border border-transparent px-px shadow-inner transition duration-200 ease-in-out",
	variants: {
		variant: {
			accent: "",
			primary: "",
			destructive: "",
		},
		size: {
			sm: "h-4 w-7",
			md: "h-5 w-9",
			lg: "h-6 w-11",
		},
		isSelected: {
			false: "bg-neutral/40 group-pressed:bg-neutral/50",
			true: "",
		},
		isDisabled: {
			true: "bg-neutral/20 forced-colors:border-[GrayText] forced-colors:group-selected:bg-[GrayText]!",
		},
	},
	compoundVariants: [
		{
			variant: "accent",
			isSelected: true,
			className: "bg-accent group-pressed:opacity-90",
		},
		{
			variant: "primary",
			isSelected: true,
			className: "bg-primary group-pressed:opacity-90",
		},
		{
			variant: "destructive",
			isSelected: true,
			className: "bg-error group-pressed:opacity-90",
		},
	],
	defaultVariants: {
		variant: "accent",
		size: "md",
		isSelected: false,
	},
});

const handle = tv({
	base: "-outline-offset-1 transform rounded-full bg-white shadow-sm outline outline-1 outline-transparent transition duration-200 ease-in-out",
	variants: {
		size: {
			sm: "h-3 w-3",
			md: "h-4 w-4",
			lg: "h-5 w-5",
		},
		isSelected: {
			false: "translate-x-0",
			true: "translate-x-[100%]",
		},
		isDisabled: {
			true: "forced-colors:outline-[GrayText]",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export function Switch({
	children,
	variant = "accent",
	size = "md",
	...props
}: SwitchProps) {
	return (
		<AriaSwitch
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"group relative flex items-center gap-2 text-dark text-sm transition disabled:text-neutral forced-colors:disabled:text-[GrayText]",
			)}
		>
			{(renderProps) => (
				<>
					<div className={track({ ...renderProps, variant, size })}>
						<span className={handle({ ...renderProps, size })} />
					</div>
					{children}
				</>
			)}
		</AriaSwitch>
	);
}
