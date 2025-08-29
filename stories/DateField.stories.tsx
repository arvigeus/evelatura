import type { Meta } from "@storybook/react-vite";
import { Form } from "react-aria-components";
import { Button } from "../src/components/ui/Button";
import { DateField } from "../src/components/ui/DateField";

const meta: Meta<typeof DateField> = {
	component: DateField,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: {
		label: "Event date",
	},
};

export default meta;

export const Example = (args: any) => <DateField {...args} />;

export const Validation = (args: any) => (
	<Form className="flex flex-col items-start gap-2">
		<DateField {...args} />
		<Button type="submit" variant="secondary">
			Submit
		</Button>
	</Form>
);

Validation.args = {
	isRequired: true,
};
