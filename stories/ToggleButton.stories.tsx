import type { Meta } from "@storybook/react-vite";
import { ToggleButton } from "../src/components/ui/ToggleButton";

const meta: Meta<typeof ToggleButton> = {
	component: ToggleButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => (
	<ToggleButton {...args}>Pin</ToggleButton>
);

export const Accent = (args: any) => (
	<ToggleButton {...args} variant="accent">
		Pin
	</ToggleButton>
);

export const Primary = (args: any) => (
	<ToggleButton {...args} variant="primary">
		Pin
	</ToggleButton>
);

export const Destructive = (args: any) => (
	<ToggleButton {...args} variant="destructive">
		Pin
	</ToggleButton>
);

export const Sizes = () => (
	<div className="flex items-center gap-2">
		<ToggleButton size="xs">XS</ToggleButton>
		<ToggleButton size="sm">SM</ToggleButton>
		<ToggleButton size="md">MD</ToggleButton>
		<ToggleButton size="lg">LG</ToggleButton>
		<ToggleButton size="xl">XL</ToggleButton>
	</div>
);
