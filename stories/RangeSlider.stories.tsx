import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "../src/components/ui/RangeSlider";

const meta: Meta<typeof RangeSlider> = {
	component: RangeSlider,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		showBounds: {
			control: "boolean",
		},
	},
	args: {
		label: "Price Range",
		defaultValue: [25, 75],
		minValue: 0,
		maxValue: 100,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PriceRange: Story = {
	args: {
		label: "Price Range",
		defaultValue: [50, 200],
		minValue: 0,
		maxValue: 500,
		formatValue: (value) => `$${value}`,
	},
};

export const Percentage: Story = {
	args: {
		label: "Completion Range",
		defaultValue: [20, 80],
		minValue: 0,
		maxValue: 100,
		formatValue: (value) => `${value}%`,
	},
};

export const CloseValues: Story = {
	args: {
		label: "Close Range",
		defaultValue: [48, 52],
		minValue: 0,
		maxValue: 100,
		formatValue: (value) => `${value}%`,
	},
};

export const WithoutBounds: Story = {
	args: {
		label: "Without Bounds Display",
		defaultValue: [25, 75],
		showBounds: false,
	},
};

export const Temperature: Story = {
	args: {
		label: "Temperature Range",
		defaultValue: [18, 24],
		minValue: -10,
		maxValue: 40,
		formatValue: (value) => `${value}°C`,
	},
};

export const FileSize: Story = {
	args: {
		label: "File Size Filter",
		defaultValue: [1, 10],
		minValue: 0,
		maxValue: 100,
		formatValue: (value) => {
			if (value === 0) return "0 MB";
			if (value < 1) return `${(value * 1000).toFixed(0)} KB`;
			if (value < 1000) return `${value.toFixed(1)} MB`;
			return `${(value / 1000).toFixed(1)} GB`;
		},
	},
};

export const TimeRange: Story = {
	args: {
		label: "Working Hours",
		defaultValue: [9, 17],
		minValue: 0,
		maxValue: 24,
		formatValue: (value) => {
			const hour = Math.floor(value);
			const minute = Math.round((value - hour) * 60);
			const period = hour >= 12 ? "PM" : "AM";
			const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
			return minute > 0
				? `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`
				: `${displayHour} ${period}`;
		},
	},
};

export const Disabled: Story = {
	args: {
		label: "Disabled Range",
		defaultValue: [25, 75],
		isDisabled: true,
	},
};

export const Step: Story = {
	args: {
		label: "Rating Range (0.5 steps)",
		defaultValue: [2.5, 4.5],
		minValue: 0,
		maxValue: 5,
		step: 0.5,
		formatValue: (value) => `${value} ⭐`,
	},
};

export const MultipleRanges: Story = {
	render: () => (
		<div className="w-96 space-y-8">
			<RangeSlider
				label="Budget Range"
				defaultValue={[1000, 5000]}
				minValue={0}
				maxValue={10000}
				formatValue={(value) => `$${value.toLocaleString()}`}
			/>
			<RangeSlider
				label="Age Range"
				defaultValue={[25, 45]}
				minValue={18}
				maxValue={65}
				formatValue={(value) => `${value} years`}
			/>
			<RangeSlider
				label="Experience"
				defaultValue={[2, 8]}
				minValue={0}
				maxValue={20}
				formatValue={(value) => `${value} years`}
			/>
		</div>
	),
};
