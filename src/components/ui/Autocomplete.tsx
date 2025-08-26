"use client";
import type { ReactNode } from "react";
import {
	Autocomplete as AriaAutocomplete,
	type AutocompleteProps as AriaAutocompleteProps,
	Menu as AriaMenu,
	MenuSection as AriaMenuSection,
	type MenuSectionProps as AriaMenuSectionProps,
	Collection,
	Header,
	type MenuItemProps,
	useFilter,
} from "react-aria-components";
import { MenuItem } from "./Menu";
import { SearchField } from "./SearchField";

export interface AutocompleteProps<T extends object>
	extends Omit<AriaAutocompleteProps, "children"> {
	children: ReactNode | ((item: T) => ReactNode);
	items?: Iterable<T>;
	label?: string;
}

export function Autocomplete<T extends object>({
	items,
	children,
	label,
	...props
}: AutocompleteProps<T>) {
	const { contains } = useFilter({ sensitivity: "base" });
	return (
		<div className="rounded-xl border-2 border-gray-200 p-3 dark:border-zinc-700">
			<AriaAutocomplete filter={contains} {...props}>
				<SearchField label={label} />
				<AriaMenu
					items={items}
					className="h-[190px] overflow-auto p-1 outline-0"
					{...props}
				>
					{children}
				</AriaMenu>
			</AriaAutocomplete>
		</div>
	);
}

export function AutocompleteItem(props: MenuItemProps) {
	return <MenuItem {...props} />;
}

export interface AutocompleteSectionProps<T> extends AriaMenuSectionProps<T> {
	title?: string;
	items?: any;
}

export function AutocompleteSection<T extends object>(
	props: AutocompleteSectionProps<T>,
) {
	return (
		<AriaMenuSection className="first:-mt-[5px] after:block after:h-[5px] after:content-['']">
			<Header className="-top-[5px] -mt-px -mx-1 sticky z-10 truncate rounded border border-gray-200 bg-gray-100/60 px-4 py-1 font-semibold text-gray-500 text-sm backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300 [&+*]:mt-1">
				{props.title}
			</Header>
			<Collection items={props.items}>{props.children}</Collection>
		</AriaMenuSection>
	);
}
