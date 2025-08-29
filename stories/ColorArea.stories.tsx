import type { Meta } from "@storybook/react-vite";
import { ColorArea } from "../src/components/ui/ColorArea";

const meta: Meta<typeof ColorArea> = {
	component: ColorArea,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => <ColorArea {...args} />;
