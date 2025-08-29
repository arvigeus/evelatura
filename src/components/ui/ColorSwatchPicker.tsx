"use client";
import {
	ColorSwatchPicker as AriaColorSwatchPicker,
	ColorSwatchPickerItem as AriaColorSwatchPickerItem,
	type ColorSwatchPickerItemProps,
	type ColorSwatchPickerProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorSwatch } from "./ColorSwatch";
import { composeTailwindRenderProps, focusRing } from "./utils";

export function ColorSwatchPicker({
	children,
	...props
}: Omit<ColorSwatchPickerProps, "layout">) {
	return (
		<AriaColorSwatchPicker
			{...props}
			className={composeTailwindRenderProps(props.className, "flex gap-1")}
		>
			{children}
		</AriaColorSwatchPicker>
	);
}

const itemStyles = tv({
	extend: focusRing,
	base: "relative rounded-xs",
});

export function ColorSwatchPickerItem(props: ColorSwatchPickerItemProps) {
	return (
		<AriaColorSwatchPickerItem {...props} className={itemStyles}>
			{({ isSelected }) => (
				<>
					<ColorSwatch />
					{isSelected && (
						<div className="-outline-offset-4 absolute top-0 left-0 h-full w-full rounded-xs border-2 border-black outline-2 outline-white forced-color-adjust-none" />
					)}
				</>
			)}
		</AriaColorSwatchPickerItem>
	);
}
