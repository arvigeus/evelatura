import type { Meta } from "@storybook/react-vite";
import { Form } from "react-aria-components";
import { Button } from "../src/components/ui/Button";
import { NumberField } from "../src/components/ui/NumberField";

const meta: Meta<typeof NumberField> = {
	component: NumberField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		label: "Cookies",
	},
};

export default meta;

export const Example = (args: any) => <NumberField {...args} />;

export const Validation = (args: any) => (
	<Form className="flex flex-col items-start gap-2">
		<NumberField {...args} />
		<Button type="submit" variant="secondary">
			Submit
		</Button>
	</Form>
);

Validation.args = {
	isRequired: true,
};
