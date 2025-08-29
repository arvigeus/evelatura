import type { Meta } from "@storybook/react-vite";
import { Tab, TabList, TabPanel, Tabs } from "../src/components/ui/Tabs";

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

export const Default = (args: any) => (
	<Tabs {...args} variant="default">
		<TabList variant="default" aria-label="History of Ancient Rome">
			<Tab variant="default" id="FoR">
				Founding of Rome
			</Tab>
			<Tab variant="default" id="MaR">
				Monarchy and Republic
			</Tab>
			<Tab variant="default" id="Emp">
				Empire
			</Tab>
		</TabList>
		<TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
		<TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
		<TabPanel id="Emp">Alea jacta est.</TabPanel>
	</Tabs>
);

export const Underline = (args: any) => (
	<Tabs {...args} variant="underline">
		<TabList variant="underline" aria-label="History of Ancient Rome">
			<Tab variant="underline" id="FoR">
				Founding of Rome
			</Tab>
			<Tab variant="underline" id="MaR">
				Monarchy and Republic
			</Tab>
			<Tab variant="underline" id="Emp">
				Empire
			</Tab>
		</TabList>
		<TabPanel id="FoR">Arma virumque cano, Troiae qui primus ab oris.</TabPanel>
		<TabPanel id="MaR">Senatus Populusque Romanus.</TabPanel>
		<TabPanel id="Emp">Alea jacta est.</TabPanel>
	</Tabs>
);
