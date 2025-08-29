"use client";
import {
	Link as AriaLink,
	type LinkProps as AriaLinkProps,
	composeRenderProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { focusRing } from "./utils";

interface LinkProps extends AriaLinkProps {
	variant?: "primary" | "secondary" | "unstyled";
}

const styles = tv({
	extend: focusRing,
	base: "transition disabled:cursor-default forced-colors:disabled:text-[GrayText]",
	variants: {
		variant: {
			primary:
				"rounded-xs text-accent underline decoration-accent/60 hover:decoration-accent",
			secondary:
				"rounded-xs text-dark underline decoration-dark/50 hover:decoration-dark",
			unstyled: "no-underline",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export function Link(props: LinkProps) {
	return (
		<AriaLink
			{...props}
			className={composeRenderProps(props.className, (className, renderProps) =>
				styles({ ...renderProps, className, variant: props.variant }),
			)}
		/>
	);
}
