import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "../src/components/ui/Avatar";

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl", "2xl"],
		},
	},
	args: {
		fallback: "JD",
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithImage: Story = {
	args: {
		src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
		fallback: "JD",
	},
};

export const Fallback: Story = {
	args: {
		fallback: "AB",
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar size="sm" fallback="SM" />
			<Avatar size="md" fallback="MD" />
			<Avatar size="lg" fallback="LG" />
			<Avatar size="xl" fallback="XL" />
			<Avatar size="2xl" fallback="2XL" />
		</div>
	),
};

export const WithImages: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Avatar
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
				fallback="JD"
			/>
			<Avatar
				src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
				fallback="SJ"
			/>
			<Avatar
				src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
				fallback="MW"
			/>
		</div>
	),
};

export const Group: Story = {
	render: () => (
		<AvatarGroup max={3}>
			<Avatar
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
				fallback="A"
			/>
			<Avatar
				src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100"
				fallback="B"
			/>
			<Avatar
				src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
				fallback="C"
			/>
			<Avatar fallback="D" />
			<Avatar fallback="E" />
		</AvatarGroup>
	),
};
