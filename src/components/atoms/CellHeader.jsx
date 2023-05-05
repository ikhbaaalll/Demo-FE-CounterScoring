import React from "react";
import PropTypes from "prop-types";

const CellHeader = ({ value, mergeClass = "", isCenter = false }) => {
	return (
		<div
			className={`${mergeClass} font-Roboto-Condensed ${
				isCenter ? "text-center" : ""
			}`}
			title={value}
		>
			{value}
		</div>
	);
};

CellHeader.propTypes = {
	value: PropTypes.any.isRequired,
	mergeClass: PropTypes.string,
	isCenter: PropTypes.bool,
};

export default CellHeader;
