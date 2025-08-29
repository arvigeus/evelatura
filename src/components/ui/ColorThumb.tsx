"use client";
import {
	ColorThumb as AriaColorThumb,
	type ColorThumbProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

const thumbStyles = tv({
	base: "top-[50%] left-[50%] h-6 w-6 rounded-full border-2 border-white",
	variants: {
		isFocusVisible: {
			true: "h-8 w-8",
		},
		isDragging: {
			true: "bg-gray-700 forced-colors:bg-[ButtonBorder]",
		},
		isDisabled: {
			true: "border-gray-300 bg-gray-300 forced-colors:border-[GrayText] forced-colors:bg-[GrayText]",
		},
	},
});

export function ColorThumb(props: ColorThumbProps) {
	return (
		<AriaColorThumb
			{...props}
			style={({ defaultStyle, isDisabled }) => ({
				...defaultStyle,
				backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
				boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
			})}
			className={thumbStyles}
		/>
	);
}
