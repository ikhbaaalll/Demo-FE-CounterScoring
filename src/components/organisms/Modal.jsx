import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";

const Modal = ({
	title,
	mergeClassTitle = "",
	mergeClassPanel = "",
	isOpen = false,
	handleCloseModal,
	size = "lg:w-1/3 w-2/4",
	children,
}) => {
	return (
		<Dialog open={isOpen} onClose={handleCloseModal} className="relative z-50">
			<div className="fixed inset-0 bg-black/90" aria-hidden="true" />

			<div className="fixed inset-0">
				<div className="flex min-h-full items-center justify-center p-4">
					<Dialog.Panel
						className={`${size} mx-auto min-h-min max-h-[90vh] w-screen overflow-y-auto rounded-lg bg-white custom-scrollbar`}
					>
						<Dialog.Title
							className={`flex flex-row top-0 justify-between items-center bg-primary-400 border-b-2 rounded-t-lg border-black p-3 px-8 text-black ${mergeClassTitle}`}
						>
							<span className="font-semibold text-lg">{title}</span>
							<button onClick={handleCloseModal}>
								<FaTimes />
							</button>
						</Dialog.Title>
						<div
							className={`flex flex-col justify-center p-3 ${mergeClassPanel}`}
						>
							{children}
						</div>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	mergeClassTitle: PropTypes.string,
	mergeClassPanel: PropTypes.string,
	isOpen: PropTypes.bool,
	handleCloseModal: PropTypes.func,
	size: PropTypes.string,
	children: PropTypes.any,
};

export default Modal;
