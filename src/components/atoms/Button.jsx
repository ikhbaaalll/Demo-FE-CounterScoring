import React from "react";
import PropTypes from "prop-types";

const Button = ({
	text,
	type = "button",
	mergeClass = "bg-primary-600 hover:bg-primary-700",
	size = "h-9 w-32",
	onClick,
	isDisabled = false,
	onRight = false,
	leftIcon = false,
	rightIcon = false,
	rounded = "rounded-md",
	padding = "px-3",
	title = "",
}) => {
	return (
		<button
			className={`${rounded} py-2 ${padding} flex flex-row gap-2 justify-center items-center ${size} text-white ${
				onRight ? "float-right" : ""
			} ${mergeClass} ${isDisabled ? "cursor-not-allowed" : ""}`}
			onClick={onClick}
			type={type}
			disabled={isDisabled}
			title={title}
		>
			{leftIcon && leftIcon} {text} {rightIcon && rightIcon}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string,
	type: PropTypes.string,
	mergeClass: PropTypes.string,
	size: PropTypes.string,
	onClick: PropTypes.func,
	isDisabled: PropTypes.bool,
	onRight: PropTypes.bool,
	leftIcon: PropTypes.element,
	rightIcon: PropTypes.element,
	rounded: PropTypes.string,
	padding: PropTypes.string,
	title: PropTypes.string,
};

export default Button;
