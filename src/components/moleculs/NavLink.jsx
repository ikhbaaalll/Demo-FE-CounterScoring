import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, Icon, title }) => {
	const path = useLocation();

	return (
		<Link
			to={to}
			className={`flex w-full justify-between items-center rounded-lg pr-2 text-left text-sm font-medium hover:bg-primary-800/60 focus:outline-none ${
				path.pathname.includes(to) ? "bg-primary-800" : "bg-white/30"
			}`}
		>
			<div className="flex xl:gap-2 gap-1 my-4 items-center w-full mx-0 xl:mx-4">
				<span className="flex flex-shrink-0 basis-1/5 justify-center">
					<Icon
						size={"1.5em"}
						className={`${
							path.pathname.includes(to) ? "text-[#cdcdcd]" : "text-primary-800"
						}`}
					/>
				</span>
				<span className="basis-full">
					<h4
						className={`font-semibold text-base ${
							path.pathname.includes(to) ? "text-white" : "text-black"
						}`}
					>
						{title}
					</h4>
				</span>
			</div>
			<></>
		</Link>
	);
};

NavLink.propTypes = {
	to: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
};

export default NavLink;
