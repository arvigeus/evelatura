import type { Meta } from "@storybook/react-vite";
import { DialogTrigger } from "react-aria-components";
import { AlertDialog } from "../src/components/ui/AlertDialog";
import { Button } from "../src/components/ui/Button";
import { Modal } from "../src/components/ui/Modal";

const meta: Meta<typeof AlertDialog> = {
	component: AlertDialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => (
	<DialogTrigger>
		<Button variant="secondary">Show Info…</Button>
		<Modal>
			<AlertDialog {...args} />
		</Modal>
	</DialogTrigger>
);

Default.args = {
	title: "Information",
	children: "This is an informational alert dialog.",
	variant: "info",
	actionLabel: "OK",
};

export const Info = (args: any) => (
	<DialogTrigger>
		<Button variant="secondary">Show Info…</Button>
		<Modal>
			<AlertDialog {...args} />
		</Modal>
	</DialogTrigger>
);

Info.args = {
	title: "Information",
	children: "This is an informational alert dialog.",
	variant: "info",
	actionLabel: "OK",
};

export const Destructive = (args: any) => (
	<DialogTrigger>
		<Button variant="secondary">Delete…</Button>
		<Modal>
			<AlertDialog {...args} />
		</Modal>
	</DialogTrigger>
);

Destructive.args = {
	title: "Delete folder",
	children:
		'Are you sure you want to delete "Documents"? All contents will be permanently destroyed.',
	variant: "destructive",
	actionLabel: "Delete",
};
