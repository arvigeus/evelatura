import type { Meta } from "@storybook/react-vite";
import { Link } from "../src/components/ui/Link";

const meta: Meta<typeof Link> = {
	component: Link,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => <Link {...args}>The missing link</Link>;

Default.args = {
	href: "https://www.imdb.com/title/tt6348138/",
	target: "_blank",
};

export const Primary = (args: any) => (
	<Link {...args} variant="primary">
		Primary link
	</Link>
);

Primary.args = {
	href: "https://www.imdb.com/title/tt6348138/",
	target: "_blank",
};

export const Secondary = (args: any) => (
	<Link {...args} variant="secondary">
		Secondary link
	</Link>
);

Secondary.args = {
	href: "https://www.imdb.com/title/tt6348138/",
	target: "_blank",
};

export const Unstyled = (args: any) => (
	<Link {...args} variant="unstyled">
		Unstyled link
	</Link>
);

Unstyled.args = {
	href: "#",
};
