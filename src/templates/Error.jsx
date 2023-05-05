import React from "react";
import PropTypes from "prop-types";
import { MdErrorOutline } from "react-icons/md";

const Error = ({ error }) => {
	return (
		<div className="flex flex-col w-full h-full justify-center items-center gap-5">
			<MdErrorOutline className="text-red-600 text-6xl" />
			<h4 className="text-lg text-red-600">{error}</h4>
		</div>
	);
};

Error.propTypes = {
	error: PropTypes.string.isRequired,
};

export default Error;
