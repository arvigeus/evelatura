"use client";
import type { ReactNode } from "react";
import {
	Radio as RACRadio,
	RadioGroup as RACRadioGroup,
	type RadioGroupProps as RACRadioGroupProps,
	type RadioProps,
	type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

export interface RadioGroupProps extends Omit<RACRadioGroupProps, "children"> {
	label?: string;
	children?: ReactNode;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
}

export function RadioGroup(props: RadioGroupProps) {
	return (
		<RACRadioGroup
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"group flex flex-col gap-2",
			)}
		>
			<Label>{props.label}</Label>
			<div className="flex gap-2 group-orientation-vertical:flex-col group-orientation-horizontal:gap-4">
				{props.children}
			</div>
			{props.description && <Description>{props.description}</Description>}
			<FieldError>{props.errorMessage}</FieldError>
		</RACRadioGroup>
	);
}

const styles = tv({
	extend: focusRing,
	base: "h-5 w-5 rounded-full border-2 bg-surface transition-all",
	variants: {
		isSelected: {
			false: "border-neutral/40 group-pressed:border-neutral/50",
			true: "border-[7px] border-accent group-pressed:opacity-90 forced-colors:border-[Highlight]!",
		},
		isInvalid: {
			true: "border-error group-pressed:border-error/80 forced-colors:border-[Mark]!",
		},
		isDisabled: {
			true: "border-neutral/20 forced-colors:border-[GrayText]!",
		},
	},
});

export function Radio(props: RadioProps) {
	return (
		<RACRadio
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"group relative flex items-center gap-2 text-dark text-sm transition disabled:text-neutral forced-colors:disabled:text-[GrayText]",
			)}
		>
			{(renderProps) => (
				<>
					<div className={styles(renderProps)} />
					{props.children}
				</>
			)}
		</RACRadio>
	);
}
