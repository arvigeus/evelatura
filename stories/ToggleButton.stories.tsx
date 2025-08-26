import { Meta } from "@storybook/react-vite";
import { ToggleButton } from "../src/components/ui/ToggleButton";

const meta: Meta<typeof ToggleButton> = {
	component: ToggleButton,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => (
	<ToggleButton {...args}>Pin</ToggleButton>
);
