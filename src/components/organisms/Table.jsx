import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { GoChevronLeft } from "react-icons/go";

import { numberWithDelimeter } from "@services/formatter";

const Table = ({
	columns,
	data,
	pageCount,
	state,
	setPagination,
	total = 0,
	getRowCanExpand = () => false,
	SubComponent,
	isUsePagination = true,
	mergeClass = "",
	headerTransparent = false,
	shouldHasPadding = true,
}) => {
	const table = useReactTable({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		pageCount,
		onPaginationChange: setPagination,
		state: { state },
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		initialState: {
			columnVisibility: {
				...Object.assign(
					{},
					...columns.map((item) => ({
						[item.accessorKey]: item.isVisible ?? true,
					})),
				),
			},
		},
		getRowCanExpand: getRowCanExpand,
		getExpandedRowModel: getExpandedRowModel(),
	});

	return (
		<>
			<div
				className={`mt-2 overflow-auto custom-scrollbar font-Roboto-Condensed round-table shadow-md ${mergeClass}`}
			>
				<table className="border-collapse w-full custom-scrollbar">
					<thead
						className={`sticky top-0 ${
							headerTransparent
								? ""
								: "shadow-[0px_1px_10px_5px_rgba(120,120,120,0.3)]"
						}`}
					>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className={`p-2 text-left ${
											headerTransparent
												? ""
												: "border-neutral-700 bg-primary-400 text-left shadow-[15px_12px_50px_20px_rgba(241,245,249,0.9)]"
										} `}
									>
										{header.column.columnDef.header}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{!data.length ? (
							<tr>
								<td
									className="border border-solid border-slate-200 text-center"
									colSpan={table.getAllColumns().length}
								>
									No Data Available
								</td>
							</tr>
						) : (
							table.getPaginationRowModel().rows.map((row) => (
								<Fragment key={row.id}>
									<tr
										className={row?.index % 2 === 0 ? "bg-primary-500/30" : ""}
									>
										{row.getVisibleCells().map((cell) => (
											<td
												key={cell.id}
												className={`border border-solid border-slate-200 ${
													shouldHasPadding ? "p-1" : ""
												}`}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</td>
										))}
									</tr>
									{row.getIsExpanded() && (
										<tr>
											<td colSpan={row.getVisibleCells().length}>
												{<SubComponent row={row} />}
											</td>
										</tr>
									)}
								</Fragment>
							))
						)}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			{isUsePagination && total > 0 ? (
				<div className="w-auto flex flex-row justify-between mt-4 pb-2 font-Roboto-Condensed">
					<div className="flex md:flex-row flex-col md:items-center items-start gap-2">
						<span className="flex gap-2">
							Show
							<select
								className="border border-primary-500 rounded-md px-1"
								value={state.pageSize}
								onChange={(e) => {
									table.setPageSize(Number(e.target.value));
									table.setPageIndex(0);
								}}
							>
								{[10, 20, 50, 100].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
								<option value={total}>All</option>
							</select>
						</span>
						<p>from {numberWithDelimeter(total)} results</p>
					</div>
					<div className="flex flex-col md:flex-row md:float-right items-center gap-2">
						<span className="flex gap-2">
							<button
								className={`bg-white border border-primary-500 rounded-md p-1 flex ${
									state.pageIndex === 0 ? "text-gray-400" : "text-slate-900"
								}`}
								onClick={() => table.setPageIndex(0)}
								disabled={state.pageIndex === 0}
							>
								<GoChevronLeft className="w-4 h-4" />
								<GoChevronLeft className="w-4 h-4 ml-[-12px]" />
							</button>
							<button
								className={`bg-white border border-primary-500 rounded-md p-1 ${
									state.pageIndex === 0 ? "text-gray-400" : "text-slate-900"
								}`}
								onClick={() => table.previousPage()}
								disabled={state.pageIndex === 0}
							>
								<GoChevronLeft className="w-4 h-4" />
							</button>
							<button
								className={`bg-white border border-primary-500 rounded-md p-1 ${
									state.pageIndex + 1 === pageCount
										? "text-gray-400"
										: "text-slate-900"
								}`}
								onClick={() => table.nextPage()}
								disabled={state.pageIndex + 1 === pageCount}
							>
								<GoChevronLeft className="w-4 h-4 rotate-180 transform" />
							</button>
							<button
								className={`bg-white border border-primary-500 rounded-md p-1 flex ${
									state.pageIndex + 1 === pageCount
										? "text-gray-400"
										: "text-slate-900"
								}`}
								onClick={() => table.setPageIndex(table.getPageCount() - 1)}
								disabled={state.pageIndex + 1 === pageCount}
							>
								<GoChevronLeft className="w-4 h-4 rotate-180 transform" />
								<GoChevronLeft className="w-4 h-4 ml-[-12px] rotate-180 transform" />
							</button>
						</span>
						<span className="flex items-center gap-1">
							<div>Page</div>
							<strong>
								{state.pageIndex + 1} of {table.getPageCount()}
							</strong>
						</span>
					</div>
				</div>
			) : null}
		</>
	);
};

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	pageCount: PropTypes.number,
	state: PropTypes.object.isRequired,
	setPagination: PropTypes.func,
	total: PropTypes.number,
	getRowCanExpand: PropTypes.func,
	SubComponent: PropTypes.func,
	isUsePagination: PropTypes.bool,
	mergeClass: PropTypes.string,
	headerTransparent: PropTypes.bool,
	shouldHasPadding: PropTypes.bool,
};

export default Table;
