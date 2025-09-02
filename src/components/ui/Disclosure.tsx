"use client";
import { ChevronRight } from "lucide-react";
import { type ReactNode, useContext } from "react";
import {
	Disclosure as AriaDisclosure,
	DisclosureGroup as AriaDisclosureGroup,
	type DisclosureGroupProps as AriaDisclosureGroupProps,
	DisclosurePanel as AriaDisclosurePanel,
	type DisclosurePanelProps as AriaDisclosurePanelProps,
	type DisclosureProps as AriaDisclosureProps,
	Button,
	composeRenderProps,
	DisclosureGroupStateContext,
	DisclosureStateContext,
	Heading,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps, focusRing } from "./utils";

const disclosure = tv({
	base: "group min-w-64 rounded-lg border border-gray-200",
	variants: {
		isInGroup: {
			true: "rounded-b-none border-0 border-b last:rounded-b-lg last:border-b-0",
		},
	},
});

const disclosureButton = tv({
	extend: focusRing,
	base: "flex w-full cursor-default items-center gap-2 rounded-lg p-2 text-start",
	variants: {
		isDisabled: {
			true: "text-gray-300 forced-colors:text-[GrayText]",
		},
		isInGroup: {
			true: "-outline-offset-2 rounded-none group-first:rounded-t-lg group-last:rounded-b-lg",
		},
	},
});

const chevron = tv({
	base: "h-5 w-5 text-gray-500 transition-transform duration-200 ease-in-out",
	variants: {
		isExpanded: {
			true: "rotate-90 transform",
		},
		isDisabled: {
			true: "text-gray-300 forced-colors:text-[GrayText]",
		},
	},
});

export interface DisclosureProps extends AriaDisclosureProps {
	children: ReactNode;
}

export function Disclosure({ children, ...props }: DisclosureProps) {
	const isInGroup = useContext(DisclosureGroupStateContext) !== null;
	return (
		<AriaDisclosure
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				disclosure({ ...renderProps, isInGroup, className }),
			)}
		>
			{children}
		</AriaDisclosure>
	);
}

export interface DisclosureHeaderProps {
	children: ReactNode;
}

export function DisclosureHeader({ children }: DisclosureHeaderProps) {
	const context = useContext(DisclosureStateContext);
	if (!context) {
		throw new Error(
			"DisclosureHeader must be used within a Disclosure component",
		);
	}
	const { isExpanded } = context;
	const isInGroup = useContext(DisclosureGroupStateContext) !== null;
	return (
		<Heading className="font-semibold text-lg">
			<Button
				slot="trigger"
				className={(renderProps) =>
					disclosureButton({ ...renderProps, isInGroup })
				}
			>
				{({ isDisabled }) => (
					<>
						<ChevronRight
							aria-hidden
							className={chevron({ isExpanded, isDisabled })}
						/>
						{children}
					</>
				)}
			</Button>
		</Heading>
	);
}

export interface DisclosurePanelProps extends AriaDisclosurePanelProps {
	children: ReactNode;
}

export function DisclosurePanel({ children, ...props }: DisclosurePanelProps) {
	return (
		<AriaDisclosurePanel
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"group-data-[expanded]:px-4 group-data-[expanded]:py-2",
			)}
		>
			{children}
		</AriaDisclosurePanel>
	);
}

export interface DisclosureGroupProps extends AriaDisclosureGroupProps {
	children: ReactNode;
}

export function DisclosureGroup({ children, ...props }: DisclosureGroupProps) {
	return (
		<AriaDisclosureGroup
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"rounded-lg border border-gray-200",
			)}
		>
			{children}
		</AriaDisclosureGroup>
	);
}
