"use client";
import {
	Slider as AriaSlider,
	type SliderProps as AriaSliderProps,
	SliderOutput,
	SliderThumb,
	SliderTrack,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

const trackStyles = tv({
	base: "rounded-full",
	variants: {
		orientation: {
			horizontal: "h-[6px] w-full",
			vertical: "-translate-x-[50%] ml-[50%] h-full w-[6px]",
		},
		isDisabled: {
			false: "bg-accent/30 forced-colors:bg-[ButtonBorder]",
			true: "bg-neutral/20 forced-colors:bg-[GrayText]",
		},
	},
});

const thumbStyles = tv({
	extend: focusRing,
	base: "h-6 w-6 rounded-full border-2 border-accent bg-surface group-orientation-horizontal:mt-6 group-orientation-vertical:ml-3",
	variants: {
		isDragging: {
			true: "border-accent-hover bg-accent forced-colors:bg-[ButtonBorder]",
		},
		isDisabled: {
			true: "border-neutral/30 forced-colors:border-[GrayText]",
		},
	},
});

export interface SliderProps<T> extends AriaSliderProps<T> {
	label?: string;
	thumbLabels?: string[];
}

export function Slider<T extends number | number[]>({
	label,
	thumbLabels,
	...props
}: SliderProps<T>) {
	return (
		<AriaSlider
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"orientation-vertical:flex orientation-horizontal:grid orientation-horizontal:w-64 grid-cols-[1fr_auto] flex-col items-center gap-2",
			)}
		>
			<Label>{label}</Label>
			<SliderOutput className="orientation-vertical:hidden font-medium text-neutral text-sm">
				{({ state }) =>
					state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")
				}
			</SliderOutput>
			<SliderTrack className="group col-span-2 flex orientation-horizontal:h-6 orientation-vertical:h-64 orientation-vertical:w-6 items-center">
				{({ state, ...renderProps }) => (
					<>
						<div className={trackStyles(renderProps)} />
						{state.values.map((_, i) => (
							<SliderThumb
								// biome-ignore lint/suspicious/noArrayIndexKey: Index indicates slider
								key={i}
								index={i}
								aria-label={thumbLabels?.[i]}
								className={thumbStyles}
							/>
						))}
					</>
				)}
			</SliderTrack>
		</AriaSlider>
	);
}
