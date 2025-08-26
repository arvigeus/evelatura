import { Meta } from "@storybook/react-vite";
import { ColorWheel } from "../src/components/ui/ColorWheel";

const meta: Meta<typeof ColorWheel> = {
	component: ColorWheel,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => <ColorWheel {...args} />;
