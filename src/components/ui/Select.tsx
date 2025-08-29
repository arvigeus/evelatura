"use client";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import {
	Select as AriaSelect,
	type SelectProps as AriaSelectProps,
	Button,
	ListBox,
	type ListBoxItemProps,
	SelectValue,
	type ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Description, FieldError, Label } from "./Field";
import {
	DropdownItem,
	DropdownSection,
	type DropdownSectionProps,
} from "./ListBox";
import { Popover } from "./Popover";
import { composeTailwindRenderProps, focusRing } from "./utils";

const styles = tv({
	extend: focusRing,
	base: "flex w-full min-w-[150px] cursor-default items-center gap-4 rounded-lg border border-black/10 bg-gray-50 py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition",
	variants: {
		isDisabled: {
			false:
				"pressed:bg-gray-200 text-gray-800 hover:bg-gray-100 group-invalid:border-red-600 forced-colors:group-invalid:border-[Mark]",
			true: "text-gray-200 forced-colors:border-[GrayText] forced-colors:text-[GrayText]",
		},
	},
});

export interface SelectProps<T extends object>
	extends Omit<AriaSelectProps<T>, "children"> {
	label?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
	items?: Iterable<T>;
	children: ReactNode | ((item: T) => ReactNode);
}

export function Select<T extends object>({
	label,
	description,
	errorMessage,
	children,
	items,
	...props
}: SelectProps<T>) {
	return (
		<AriaSelect
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"group relative flex flex-col gap-1",
			)}
		>
			{label && <Label>{label}</Label>}
			<Button className={styles}>
				<SelectValue className="flex-1 text-sm placeholder-shown:italic" />
				<ChevronDown
					aria-hidden
					className="h-4 w-4 text-gray-600 group-disabled:text-gray-200 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
				/>
			</Button>
			{description && <Description>{description}</Description>}
			<FieldError>{errorMessage}</FieldError>
			<Popover className="min-w-(--trigger-width)">
				<ListBox
					items={items}
					className="max-h-[inherit] overflow-auto p-1 outline-hidden [clip-path:inset(0_0_0_0_round_.75rem)]"
				>
					{children}
				</ListBox>
			</Popover>
		</AriaSelect>
	);
}

export function SelectItem(props: ListBoxItemProps) {
	return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(
	props: DropdownSectionProps<T>,
) {
	return <DropdownSection {...props} />;
}
