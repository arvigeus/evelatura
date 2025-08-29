"use client";
import {
	ColorArea as AriaColorArea,
	type ColorAreaProps as AriaColorAreaProps,
} from "react-aria-components";
import { ColorThumb } from "./ColorThumb";
import { composeTailwindRenderProps } from "./utils";

export interface ColorAreaProps extends AriaColorAreaProps {}

export function ColorArea(props: ColorAreaProps) {
	return (
		<AriaColorArea
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"h-56 w-56 rounded-lg bg-gray-300 forced-colors:bg-[GrayText]",
			)}
			style={({ defaultStyle, isDisabled }) => ({
				...defaultStyle,
				background: isDisabled ? undefined : defaultStyle.background,
			})}
		>
			<ColorThumb />
		</AriaColorArea>
	);
}
