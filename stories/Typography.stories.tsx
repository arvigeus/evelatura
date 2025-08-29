import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
	title: "Typography",
	parameters: {
		layout: "padded",
	},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<article className="prose lg:prose-xl">
			<h2>Garlic bread with cheese: What the science tells us</h2>
			<p>
				For years parents have espoused the health benefits of eating garlic
				bread with cheese to their children, with the food earning such an
				iconic status in our culture that kids will often dress up as warm,
				cheesy loaf for Halloween.
			</p>
			<p>
				But a recent study shows that the celebrated appetizer may be linked to
				a series of rabies cases springing up around the country.
			</p>
		</article>
	),
};
