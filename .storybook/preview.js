import { themes } from "storybook/theming";
import "../src/styles.css";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {},
		},
		docs: {
			theme: themes.light,
			// theme: window.matchMedia("(prefers-color-scheme: dark)").matches
			// 	? themes.dark
			// 	: themes.light,
		},
	},
};

export default preview;
