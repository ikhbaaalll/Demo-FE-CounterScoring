import React from "react";
import PropTypes from "prop-types";
import {
	MdOutlineModeEdit,
	MdDeleteOutline,
	MdArrowForward,
} from "react-icons/md";

const ActionButton = ({
	data,
	isCanEdit = true,
	isCanDelete = true,
	isCanView = false,
	onClickEdit,
	onClickDelete,
	onClickView,
}) => {
	return (
		<div className="flex flex-row gap-4 p-1 justify-center">
			{isCanEdit && (
				<div
					className="bg-warning-500 text-black rounded-md p-1 cursor-pointer hover:bg-warning-500/80"
					onClick={() => onClickEdit(data)}
				>
					<MdOutlineModeEdit className="h-5 w-5" />
				</div>
			)}
			{isCanDelete && (
				<div
					className="bg-error-500 text-white rounded-md p-1 cursor-pointer hover:bg-error-700"
					onClick={() => onClickDelete(data)}
				>
					<MdDeleteOutline className="h-5 w-5" />
				</div>
			)}
			{isCanView && (
				<div
					className="border-black bg-white text-black rounded-full p-1 cursor-pointer hover:bg-primary-500 border-2 border-black/70"
					onClick={() => onClickView(data)}
				>
					<MdArrowForward className="h-5 w-5" />
				</div>
			)}
		</div>
	);
};

ActionButton.propTypes = {
	data: PropTypes.object.isRequired,
	isCanEdit: PropTypes.bool,
	isCanDelete: PropTypes.bool,
	isCanView: PropTypes.bool,
	onClickEdit: PropTypes.func,
	onClickDelete: PropTypes.func,
	onClickView: PropTypes.func,
};

export default ActionButton;
