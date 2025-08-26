import { Meta } from "@storybook/react-vite";
import { Link } from "../src/components/ui/Link";

const meta: Meta<typeof Link> = {
	component: Link,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Example = (args: any) => <Link {...args}>The missing link</Link>;

Example.args = {
	href: "https://www.imdb.com/title/tt6348138/",
	target: "_blank",
};
