import type { Meta } from "@storybook/react-vite";
import { Meter } from "../src/components/ui/Meter";

const meta: Meta<typeof Meter> = {
	component: Meter,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => <Meter {...args} />;

Example.args = {
	label: "Storage space",
	value: 80,
};
