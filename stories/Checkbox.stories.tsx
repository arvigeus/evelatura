import { Checkbox } from "../src/components/ui/Checkbox";

export default {
	title: "Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {
		isDisabled: false,
		children: "Checkbox",
	},
};

export const Default = {
	args: {},
};

export const Accent = {
	args: {
		variant: "accent",
	},
};

export const Primary = {
	args: {
		variant: "primary",
	},
};

export const Destructive = {
	args: {
		variant: "destructive",
	},
};
