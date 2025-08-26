import { Meta } from "@storybook/react-vite";
import { Switch } from "../src/components/ui/Switch";

const meta: Meta<typeof Switch> = {
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => <Switch {...args}>Wi-Fi</Switch>;
