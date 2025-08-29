const _excludedProps = new Set([
	"id",
	"slot",
	"onCopy",
	"onCut",
	"onPaste",
	"onCompositionStart",
	"onCompositionEnd",
	"onCompositionUpdate",
	"onSelect",
	"onBeforeInput",
	"onInput",
]);

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
	stories: [
		"../stories/**/*.mdx",
		"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],

	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
};
export default config;
