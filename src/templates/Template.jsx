import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { FaAlignJustify, FaTachometerAlt, FaDatabase } from "react-icons/fa";

import CeleratesLogo from "@assets/images/Celerates-Logo.png";

import { NavLink, NavLinkCollapse } from "@components/moleculs";

import { ROUTE_MASTER, ROUTE_MATCH } from "@routes/routes";

import { useSidebarStore } from "@stores/sidebarStore";

function Template() {
	const location = useLocation();
	const isOpen = useSidebarStore((state) => state.isOpen);
	const setIsOpen = useSidebarStore((state) => state.setIsOpen);

	return (
		<div className="flex">
			{location.pathname !== "/unauthorized" && (
				<>
					<div
						className={`flex-shrink-0 h-screen lg:block hidden top-0 left-0 bg-primary-400 overflow-y-hidden scrollbar-hide ease-linear duration-200 lg:w-1/6 w-1/12 items-center translate-x-0`}
					>
						<div className={`flex flex-col gap-1 pb-2`}>
							<div
								className={`flex flex-row items-center lg:justify-start justify-center mx-4 my-4`}
							></div>
							<div className="px-4">
								<NavLink
									Icon={FaTachometerAlt}
									title="Match"
									to={ROUTE_MATCH.find((item) => item.isNavbar).path}
								/>
							</div>
							<div className="px-4">
								<NavLinkCollapse
									Icon={FaDatabase}
									title={"Master Data"}
									child={ROUTE_MASTER}
									prefix="master"
								/>
							</div>
						</div>
					</div>

					<div
						className={`${
							isOpen
								? "absolute sm:w-2/6 w-1/2 border-r-[1px] border-black bg-primary-400 h-screen top-0 left-0 overflow-y-hidden scrollbar-hide flex-shrink-0 z-40"
								: "hidden"
						} lg:hidden gap-1 pb-2`}
					>
						<div className={`flex flex-col`}>
							<div
								className={`flex flex-row items-center ${
									isOpen ? "justify-between" : ""
								} mx-4 my-1`}
							>
								<img
									alt="trakindo-logo"
									src={CeleratesLogo}
									className="w-28 h-20"
								/>
								<button
									onClick={() => setIsOpen(!isOpen)}
									className="lg:hidden block text-black"
								>
									<FaAlignJustify />
								</button>
							</div>
							<div className="md:px-3 px-2">
								<NavLink
									Icon={FaTachometerAlt}
									title="Match"
									to={ROUTE_MATCH.find((item) => item.isNavbar).path}
								/>
							</div>
							<div className="md:px-3 px-2">
								<NavLinkCollapse
									Icon={FaDatabase}
									title="Master Data"
									child={ROUTE_MASTER}
									prefix="master"
								/>
							</div>
						</div>
					</div>
				</>
			)}
			<div className="flex-grow w-10/12 h-screen overflow-y-hidden font-Roboto-Condensed">
				<div className="flex flex-col w-full bg-primary-400 overflow-hidden h-full">
					<Outlet />
				</div>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					newestOnTop
					hideProgressBar
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					theme="colored"
				/>
			</div>
		</div>
	);
}

export default Template;
