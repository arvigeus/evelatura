"use client";
import { Check, Minus } from "lucide-react";
import type { ReactNode } from "react";
import {
	Checkbox as AriaCheckbox,
	CheckboxGroup as AriaCheckboxGroup,
	type CheckboxGroupProps as AriaCheckboxGroupProps,
	type CheckboxProps as AriaCheckboxProps,
	composeRenderProps,
	type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface CheckboxGroupProps
	extends Omit<AriaCheckboxGroupProps, "children"> {
	label?: string;
	children?: ReactNode;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
}

export interface CheckboxProps extends Omit<AriaCheckboxProps, "className"> {
	/** @default 'accent' */
	variant?: "accent" | "primary" | "destructive";
	className?: string;
}

export function CheckboxGroup(props: CheckboxGroupProps) {
	return (
		<AriaCheckboxGroup
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"flex flex-col gap-2",
			)}
		>
			<Label>{props.label}</Label>
			{props.children}
			{props.description && <Description>{props.description}</Description>}
			<FieldError>{props.errorMessage}</FieldError>
		</AriaCheckboxGroup>
	);
}

const checkboxStyles = tv({
	base: "group relative flex items-center gap-2 text-sm transition",
	variants: {
		isDisabled: {
			false: "text-dark",
			true: "text-neutral forced-colors:text-[GrayText]",
		},
	},
});

const boxStyles = tv({
	extend: focusRing,
	base: "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition",
	variants: {
		variant: {
			accent: "",
			primary: "",
			destructive: "",
		},
		isSelected: {
			false: "border-neutral/30 bg-surface group-pressed:border-neutral/40",
			true: "",
		},
		isInvalid: {
			true: "border-error group-pressed:border-error/80 forced-colors:[--color:Mark]!",
		},
		isDisabled: {
			true: "border-neutral/20 bg-muted forced-colors:[--color:GrayText]!",
		},
	},
	compoundVariants: [
		{
			variant: "accent",
			isSelected: true,
			className: "border-accent bg-accent group-pressed:opacity-90",
		},
		{
			variant: "primary",
			isSelected: true,
			className: "border-primary bg-primary group-pressed:opacity-90",
		},
		{
			variant: "destructive",
			isSelected: true,
			className: "border-error bg-error group-pressed:opacity-90",
		},
	],
	defaultVariants: {
		variant: "accent",
		isSelected: false,
	},
});

const iconStyles =
	"w-4 h-4 text-white group-disabled:text-neutral forced-colors:text-[HighlightText]";

export function Checkbox({ variant = "accent", ...props }: CheckboxProps) {
	return (
		<AriaCheckbox
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				checkboxStyles({ ...renderProps, className }),
			)}
		>
			{({ isSelected, isIndeterminate, ...renderProps }) => (
				<>
					<div
						className={boxStyles({
							variant,
							isSelected: isSelected || isIndeterminate,
							...renderProps,
						})}
					>
						{isIndeterminate ? (
							<Minus aria-hidden className={iconStyles} />
						) : isSelected ? (
							<Check aria-hidden className={iconStyles} />
						) : null}
					</div>
					{props.children}
				</>
			)}
		</AriaCheckbox>
	);
}
