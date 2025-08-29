"use client";
import { Check, ChevronRight } from "lucide-react";
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	type MenuProps as AriaMenuProps,
	MenuSection as AriaMenuSection,
	type MenuSectionProps as AriaMenuSectionProps,
	Collection,
	composeRenderProps,
	Header,
	type MenuItemProps,
	Separator,
	type SeparatorProps,
} from "react-aria-components";
import { dropdownItemStyles } from "./ListBox";
import { Popover, type PopoverProps } from "./Popover";

interface MenuProps<T> extends AriaMenuProps<T> {
	placement?: PopoverProps["placement"];
}

export function Menu<T extends object>(props: MenuProps<T>) {
	return (
		<Popover placement={props.placement} className="min-w-[150px]">
			<AriaMenu
				{...props}
				className="max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
			/>
		</Popover>
	);
}

export function MenuItem(props: MenuItemProps) {
	const textValue =
		props.textValue ||
		(typeof props.children === "string" ? props.children : undefined);
	return (
		<AriaMenuItem
			textValue={textValue}
			{...props}
			className={dropdownItemStyles}
		>
			{composeRenderProps(
				props.children,
				(children, { selectionMode, isSelected, hasSubmenu }) => (
					<>
						{selectionMode !== "none" && (
							<span className="flex w-4 items-center">
								{isSelected && <Check aria-hidden className="h-4 w-4" />}
							</span>
						)}
						<span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
							{children}
						</span>
						{hasSubmenu && (
							<ChevronRight aria-hidden className="absolute right-2 h-4 w-4" />
						)}
					</>
				),
			)}
		</AriaMenuItem>
	);
}

export function MenuSeparator(props: SeparatorProps) {
	return (
		<Separator {...props} className="mx-3 my-1 border-neutral/30 border-b" />
	);
}

export interface MenuSectionProps<T> extends AriaMenuSectionProps<T> {
	title?: string;
	items?: any;
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
	return (
		<AriaMenuSection
			{...props}
			className="first:-mt-[5px] after:block after:h-[5px] after:content-['']"
		>
			{props.title && (
				<Header className="-top-[5px] -mt-px -mx-1 sticky z-10 truncate border-y border-y-neutral/20 bg-muted/60 px-4 py-1 font-semibold text-neutral text-sm backdrop-blur-md supports-[-moz-appearance:none]:bg-muted [&+*]:mt-1">
					{props.title}
				</Header>
			)}
			<Collection items={props.items}>{props.children}</Collection>
		</AriaMenuSection>
	);
}
