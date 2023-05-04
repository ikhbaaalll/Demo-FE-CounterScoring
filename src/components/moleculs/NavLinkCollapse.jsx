import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { FaAngleUp } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";

const NavLinkCollapse = ({ title, Icon, child, prefix }) => {
	const path = useLocation();

	return (
		<Disclosure
			defaultOpen={child.map((item) => item.fullPath).includes(path.pathname)}
		>
			{({ open }) => (
				<>
					<Disclosure.Button
						className={`flex w-full justify-between items-center rounded-lg pr-2 text-left text-sm font-medium hover:bg-primary-800/60 focus:outline-none
          ${open ? "shadow-md border" : "bg-white/30"} ${
							path.pathname.includes(prefix) ? "bg-primary-500" : ""
						}
          `}
					>
						<div className="flex xl:gap-2 gap-1 my-4 items-center w-full mx-0 xl:mx-4">
							<span className="flex flex-shrink-0 basis-1/5 justify-center">
								<Icon
									size={"1.5em"}
									className={`${
										child.filter((item) => path.pathname === item.fullPath)
											.length
											? "text-[#475569]"
											: "text-primary-800"
									}`}
								/>
							</span>
							<span className="basis-full">
								<h4 className="font-Roboto font-semibold xl:text-base text-sm text-black">
									{title}
								</h4>
							</span>
						</div>
						<FaAngleUp
							className={`${
								open ? "rotate-180 transform" : ""
							} h-5 w-5 flex-shrink-0 text-black`}
						/>
					</Disclosure.Button>
					{child.map((item, index) => (
						<Disclosure.Panel
							className={`px-4 py-3 rounded-lg mt-1 text-sm text-black ${
								item.fullPath === path.pathname
									? "bg-primary-800"
									: "hover:bg-primary-800/60"
							}`}
							key={index}
						>
							<Link to={item.fullPath}>
								<h5
									className={`font-medium ml-9 text-sm ${
										item.fullPath === path.pathname
											? "text-white"
											: "text-black"
									}`}
								>
									{item.title}
								</h5>
							</Link>
						</Disclosure.Panel>
					))}
				</>
			)}
		</Disclosure>
	);
};

NavLinkCollapse.propTypes = {
	title: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	child: PropTypes.array.isRequired,
	prefix: PropTypes.string.isRequired,
};

export default NavLinkCollapse;
