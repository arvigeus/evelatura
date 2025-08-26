"use client";
import {
	ColorSlider as AriaColorSlider,
	type ColorSliderProps as AriaColorSliderProps,
	SliderOutput,
	SliderTrack,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorThumb } from "./ColorThumb";
import { Label } from "./Field";
import { composeTailwindRenderProps } from "./utils";

const trackStyles = tv({
	base: "group col-span-2 orientation-horizontal:h-6 rounded-lg",
	variants: {
		orientation: {
			horizontal: "h-6 w-full",
			vertical: "-translate-x-[50%] ml-[50%] h-56 w-6",
		},
		isDisabled: {
			true: "bg-gray-300 dark:bg-zinc-800 forced-colors:bg-[GrayText]",
		},
	},
});

interface ColorSliderProps extends AriaColorSliderProps {
	label?: string;
}

export function ColorSlider({ label, ...props }: ColorSliderProps) {
	return (
		<AriaColorSlider
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"orientation-vertical:flex orientation-horizontal:grid orientation-horizontal:w-56 grid-cols-[1fr_auto] flex-col items-center gap-2",
			)}
		>
			<Label>{label}</Label>
			<SliderOutput className="orientation-vertical:hidden font-medium text-gray-500 text-sm dark:text-zinc-400" />
			<SliderTrack
				className={trackStyles}
				style={({ defaultStyle, isDisabled }) => ({
					...defaultStyle,
					background: isDisabled
						? undefined
						: `${defaultStyle.background}, repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
				})}
			>
				<ColorThumb />
			</SliderTrack>
		</AriaColorSlider>
	);
}
