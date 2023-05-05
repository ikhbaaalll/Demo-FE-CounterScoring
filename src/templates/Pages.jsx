import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";

const Pages =
	({ Component, title = "" }) =>
	() => {
		return (
			<>
				<Header title={title} />
				<div
					className={`bg-white/70 rounded-tl-2xl w-full h-full flex flex-col overflow-hidden px-8 pt-4`}
				>
					<Component />
				</div>
			</>
		);
	};

Pages.propTypes = {
	Component: PropTypes.element,
	title: PropTypes.string,
};

export default Pages;
