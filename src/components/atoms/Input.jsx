import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(
	(
		{
			title,
			type = "text",
			isRequired = true,
			placeholder = false,
			error,
			mergeClass = "",
			onChangeFile = false,
			s3Config = {},
			isDisabled = false,
			value = "",
			...props
		},
		ref,
	) => {
		return (
			<div className="flex flex-col gap-1 mt-3">
				{title && (
					<span className="text-sm font-semibold">
						{title}
						{isRequired && <span className="text-red-500 font-normal"> *</span>}
					</span>
				)}
				<input
					step="any"
					disabled={isDisabled}
					type={type}
					ref={ref}
					className={
						"border border-primary-600 rounded-md p-1 px-4 focus:outline-none focus:border-primary-300 focus:ring-1 focus:ring-primary-600 " +
						mergeClass
					}
					placeholder={placeholder || title}
					onChange={(e) =>
						onChangeFile
							? onChangeFile(e.target.files[0], s3Config)
							: props.onChange
					}
					title={isDisabled ? value : ""}
					{...props}
				/>
				{error && (
					<span className="text-sm text-red-500">* {error.message}</span>
				)}
			</div>
		);
	},
);

Input.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	isRequired: PropTypes.bool,
	placeholder: PropTypes.string,
	error: PropTypes.object,
	mergeClass: PropTypes.string,
	onChangeFile: PropTypes.func,
	s3Config: PropTypes.object,
	onChange: PropTypes.func,
	isDisabled: PropTypes.bool,
	value: PropTypes.string,
};

export default Input;
