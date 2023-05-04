import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ text = "Loading..." }) => {
	return (
		<div className="w-full h-full mx-auto overflow-hidden flex flex-col items-center justify-center">
			<div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10 my-3 text-center mx-auto"></div>
			<h2 className="text-center text-black text-md font-semibold">{text}</h2>
		</div>
	);
};

Spinner.propTypes = {
	text: PropTypes.string,
};

export default Spinner;
