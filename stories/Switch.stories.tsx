import type { Meta } from "@storybook/react-vite";
import { Switch } from "../src/components/ui/Switch";

const meta: Meta<typeof Switch> = {
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => <Switch {...args}>Wi-Fi</Switch>;

export const Accent = (args: any) => (
	<Switch {...args} variant="accent">
		Wi-Fi
	</Switch>
);

export const Primary = (args: any) => (
	<Switch {...args} variant="primary">
		Wi-Fi
	</Switch>
);

export const Destructive = (args: any) => (
	<Switch {...args} variant="destructive">
		Wi-Fi
	</Switch>
);

export const Sizes = () => (
	<div className="flex items-center gap-4">
		<Switch size="sm">Small</Switch>
		<Switch size="md">Medium</Switch>
		<Switch size="lg">Large</Switch>
	</div>
);
