import React from "react";
import PropTypes from "prop-types";
import { FaAlignJustify } from "react-icons/fa";
import InitialsAvatar from "react-initials-avatar";
import "react-initials-avatar/lib/ReactInitialsAvatar.css";

import CeleratesLogo from "@assets/images/Celerates-Logo.png";

import { useSidebarStore } from "@stores/sidebarStore";

const Header = ({ title = "" }) => {
	const isOpen = useSidebarStore((state) => state.isOpen);
	const setIsOpen = useSidebarStore((state) => state.setIsOpen);

	return (
		<div className="flex flex-row justify-between items-center px-4 py-2 bg-primary-400/75 border-white">
			<span className="flex md:gap-3 gap-2 md:ml-3 ml-1 items-center">
				<button onClick={() => setIsOpen(!isOpen)} className="lg:hidden block">
					<FaAlignJustify className="text-black hover:text-gray-600" />
				</button>
				<img
					alt="trakindo-logo"
					src={CeleratesLogo}
					className="lg:w-16 w-0 lg:h-16 h-0 lg:block hidden"
				/>
				<h1 className="font-Roboto font-bold lg:text-xl text-md lg:ml-2 text-white tracking-wide">
					{title}
				</h1>
			</span>
			<div className="flex flex-row gap-3 items-center">
				<p className="text-sm font-medium text-white tracking-wide">
					Selamat datang, <br />
					Muhammad Ikhbal
				</p>
				<div
					className={`flex items-center justify-center w-12 h-12 rounded-full text-center border border-black bg-blue-900`}
				>
					<InitialsAvatar
						name={"Muhammad Ikhbal"}
						className="bg-transparent text-white"
					/>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string,
};

export default Header;
