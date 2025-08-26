import { Meta } from "@storybook/react-vite";
import { ColorField } from "../src/components/ui/ColorField";

const meta: Meta<typeof ColorField> = {
	component: ColorField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		label: "Color",
		defaultValue: "#ff0",
	},
};

export default meta;

export const Example = (args: any) => <ColorField {...args} />;
