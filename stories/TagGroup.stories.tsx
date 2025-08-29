import type { Meta } from "@storybook/react-vite";
import { Tag, TagGroup } from "../src/components/ui/TagGroup";

const meta: Meta<typeof TagGroup> = {
	component: TagGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => (
	<TagGroup {...args}>
		<Tag>Chocolate</Tag>
		<Tag isDisabled>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Default.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Accent = (args: any) => (
	<TagGroup {...args} color="accent">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Accent.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Primary = (args: any) => (
	<TagGroup {...args} color="primary">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Primary.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Secondary = (args: any) => (
	<TagGroup {...args} color="secondary">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Secondary.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Green = (args: any) => (
	<TagGroup {...args} color="green">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Green.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Yellow = (args: any) => (
	<TagGroup {...args} color="yellow">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Yellow.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};

export const Red = (args: any) => (
	<TagGroup {...args} color="red">
		<Tag>Chocolate</Tag>
		<Tag>Mint</Tag>
		<Tag>Strawberry</Tag>
		<Tag>Vanilla</Tag>
	</TagGroup>
);

Red.args = {
	label: "Ice cream flavor",
	selectionMode: "single",
};
