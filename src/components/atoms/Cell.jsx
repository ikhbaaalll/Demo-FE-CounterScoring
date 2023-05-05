import React from "react";
import PropTypes from "prop-types";

import { cellFormatter } from "@services/formatter";

const Cell = ({
	value = "",
	mergeClass = "",
	type = "string",
	isFormatted = true,
	shorten = false,
	maxChar = 100,
	onClick,
}) => {
	return (
		<div
			className={`${mergeClass} text-sm font-Roboto-Condensed`}
			title={value || ""}
			onClick={onClick}
		>
			{type === "list" ? (
				<>
					<ul className="list-disc">
						{value.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				</>
			) : (
				<>
					{isFormatted
						? cellFormatter(value, type, shorten, maxChar)
						: value || ""}
				</>
			)}
		</div>
	);
};

Cell.propTypes = {
	value: PropTypes.any,
	mergeClass: PropTypes.string,
	type: PropTypes.string,
	isFormatted: PropTypes.bool,
	shorten: PropTypes.bool,
	maxChar: PropTypes.number,
	onClick: PropTypes.func,
};

export default Cell;
