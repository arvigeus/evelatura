import {
	Slider as AriaSlider,
	type SliderProps as AriaSliderProps,
	SliderThumb,
	SliderTrack,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Label } from "./Field";
import { composeTailwindRenderProps, focusRing } from "./utils";

const trackStyles = tv({
	base: "relative h-[6px] w-full rounded-full bg-secondary/30",
	variants: {
		isDisabled: {
			true: "bg-neutral/20",
		},
	},
});

const rangeStyles = tv({
	base: "absolute h-full rounded-full bg-accent",
});

const thumbStyles = tv({
	extend: focusRing,
	base: "mt-6 h-6 w-6 rounded-full border-2 border-accent bg-surface transition-colors",
	variants: {
		isDragging: {
			true: "border-accent bg-accent",
		},
		isDisabled: {
			true: "border-neutral/50 bg-neutral/20",
		},
	},
});

export interface RangeSliderProps
	extends Omit<AriaSliderProps<number[]>, "defaultValue" | "value"> {
	label?: string;
	defaultValue?: [number, number];
	value?: [number, number];
	formatValue?: (value: number) => string;
	showBounds?: boolean;
}

export function RangeSlider({
	label,
	defaultValue = [0, 100],
	value,
	formatValue = (val) => val.toString(),
	showBounds = true,
	minValue = 0,
	maxValue = 100,
	...props
}: RangeSliderProps) {
	return (
		<AriaSlider
			{...props}
			defaultValue={defaultValue}
			value={value}
			minValue={minValue}
			maxValue={maxValue}
			className={composeTailwindRenderProps(
				props.className,
				"grid w-80 grid-cols-[1fr] flex-col gap-3",
			)}
		>
			{({ state }) => (
				<>
					{label && <Label>{label}</Label>}

					<SliderTrack className="group relative col-span-1 flex h-6 items-center">
						{({ ...renderProps }) => {
							const range = state.values as number[];
							const minPercent =
								((range[0] - minValue) / (maxValue - minValue)) * 100;
							const maxPercent =
								((range[1] - minValue) / (maxValue - minValue)) * 100;

							return (
								<>
									{/* Track background */}
									<div className={trackStyles(renderProps)}>
										{/* Selected range highlight */}
										<div
											className={rangeStyles()}
											style={{
												left: `${minPercent}%`,
												width: `${maxPercent - minPercent}%`,
											}}
										/>
									</div>

									{/* Min thumb */}
									<SliderThumb index={0} className={thumbStyles} />

									{/* Max thumb */}
									<SliderThumb index={1} className={thumbStyles} />
								</>
							);
						}}
					</SliderTrack>

					<div
						className={`mt-2 flex items-center ${showBounds ? "justify-between" : "justify-center"}`}
					>
						{showBounds && (
							<span className="text-neutral/60 text-xs">
								{formatValue(minValue)}
							</span>
						)}

						<div className="flex max-w-fit cursor-default items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-3 py-0.5 text-accent text-xs outline outline-0 outline-accent outline-offset-2 transition hover:border-accent/40 forced-colors:outline-[Highlight]">
							{state.values[0] === state.values[1]
								? formatValue(state.values[0])
								: `${formatValue(state.values[0])} - ${formatValue(state.values[1])}`}
						</div>

						{showBounds && (
							<span className="text-neutral/60 text-xs">
								{formatValue(maxValue)}
							</span>
						)}
					</div>
				</>
			)}
		</AriaSlider>
	);
}
