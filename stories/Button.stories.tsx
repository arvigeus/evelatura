import { Button } from "../src/components/ui/Button";

export default {
	title: "Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"primary",
				"secondary",
				"accent",
				"outline",
				"destructive",
				"ghost",
				"icon",
			],
		},
		size: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl"],
		},
	},
	args: {
		isDisabled: false,
		children: "Button",
		variant: "primary",
		size: "md",
	},
};

export const Primary = {
	args: {
		variant: "primary",
	},
};

export const Secondary = {
	args: {
		variant: "secondary",
	},
};

export const Accent = {
	args: {
		variant: "accent",
	},
};

export const Outline = {
	args: {
		variant: "outline",
	},
};

export const Destructive = {
	args: {
		variant: "destructive",
	},
};

export const Ghost = {
	args: {
		variant: "ghost",
	},
};

export const Sizes = {
	render: () => (
		<div className="flex items-center gap-4">
			<Button size="xs">Extra Small</Button>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
			<Button size="xl">Extra Large</Button>
		</div>
	),
};
