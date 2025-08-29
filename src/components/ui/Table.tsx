"use client";
import { ArrowUp } from "lucide-react";
import {
	Cell as AriaCell,
	Column as AriaColumn,
	Row as AriaRow,
	Table as AriaTable,
	TableHeader as AriaTableHeader,
	Button,
	type CellProps,
	Collection,
	type ColumnProps,
	ColumnResizer,
	composeRenderProps,
	Group,
	ResizableTableContainer,
	type RowProps,
	type TableHeaderProps,
	type TableProps,
	useTableOptions,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import { Checkbox } from "./Checkbox";
import { composeTailwindRenderProps, focusRing } from "./utils";

export function Table(props: TableProps) {
	return (
		<ResizableTableContainer className="relative max-h-[280px] w-[550px] scroll-pt-[2.281rem] overflow-auto rounded-lg border border-gray-200">
			<AriaTable {...props} className="border-separate border-spacing-0" />
		</ResizableTableContainer>
	);
}

const columnStyles = tv({
	extend: focusRing,
	base: "flex h-5 flex-1 items-center gap-1 overflow-hidden px-2",
});

const resizerStyles = tv({
	extend: focusRing,
	base: "-outline-offset-2 box-content h-5 resizing:w-[2px] w-px translate-x-[8px] cursor-col-resize rounded-xs bg-gray-400 resizing:bg-accent bg-clip-content px-[8px] py-1 resizing:pl-[7px] forced-colors:bg-[ButtonBorder] forced-colors:resizing:bg-[Highlight]",
});

export function Column(props: ColumnProps) {
	return (
		<AriaColumn
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"cursor-default text-start font-semibold text-gray-700 text-sm focus-within:z-20 [&:hover]:z-20",
			)}
		>
			{composeRenderProps(
				props.children,
				(children, { allowsSorting, sortDirection }) => (
					<div className="flex items-center">
						<Group role="presentation" tabIndex={-1} className={columnStyles}>
							<span className="truncate">{children}</span>
							{allowsSorting && (
								<span
									className={`flex h-4 w-4 items-center justify-center transition ${
										sortDirection === "descending" ? "rotate-180" : ""
									}`}
								>
									{sortDirection && (
										<ArrowUp
											aria-hidden
											className="h-4 w-4 text-gray-500 forced-colors:text-[ButtonText]"
										/>
									)}
								</span>
							)}
						</Group>
						{!props.width && <ColumnResizer className={resizerStyles} />}
					</div>
				),
			)}
		</AriaColumn>
	);
}

export function TableHeader<T extends object>(props: TableHeaderProps<T>) {
	const { selectionBehavior, selectionMode, allowsDragging } =
		useTableOptions();

	return (
		<AriaTableHeader
			{...props}
			className={composeTailwindRenderProps(
				props.className,
				"sticky top-0 z-10 rounded-t-lg border-b border-b-gray-200 bg-gray-100/60 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 forced-colors:bg-[Canvas]",
			)}
		>
			{/* Add extra columns for drag and drop and selection. */}
			{allowsDragging && <Column />}
			{selectionBehavior === "toggle" && (
				<AriaColumn
					width={36}
					minWidth={36}
					className="cursor-default p-2 text-start font-semibold text-sm"
				>
					{selectionMode === "multiple" && <Checkbox slot="selection" />}
				</AriaColumn>
			)}
			<Collection items={props.columns}>{props.children}</Collection>
		</AriaTableHeader>
	);
}

const rowStyles = tv({
	extend: focusRing,
	base: "group/row -outline-offset-2 relative cursor-default select-none selected:bg-blue-100 text-sm hover:bg-gray-100 selected:hover:bg-blue-200 disabled:text-gray-300",
});

export function Row<T extends object>({
	id,
	columns,
	children,
	...otherProps
}: RowProps<T>) {
	const { selectionBehavior, allowsDragging } = useTableOptions();

	return (
		<AriaRow id={id} {...otherProps} className={rowStyles}>
			{allowsDragging && (
				<Cell>
					<Button slot="drag">≡</Button>
				</Cell>
			)}
			{selectionBehavior === "toggle" && (
				<Cell>
					<Checkbox slot="selection" />
				</Cell>
			)}
			<Collection items={columns}>{children}</Collection>
		</AriaRow>
	);
}

const cellStyles = tv({
	extend: focusRing,
	base: "-outline-offset-2 truncate in-[:has(+[data-selected])]:border-(--selected-border) border-b border-b-gray-200 p-2 [--selected-border:var(--color-blue-200)] group-last/row:border-b-0 group-selected/row:border-(--selected-border)",
});

export function Cell(props: CellProps) {
	return <AriaCell {...props} className={cellStyles} />;
}
