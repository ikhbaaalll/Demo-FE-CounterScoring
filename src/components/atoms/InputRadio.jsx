import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const InputRadio = forwardRef(({ control, text, value, ...props }, ref) => {
	return (
		<Controller
			control={control}
			render={({ field: { onChange, onBlur, value: valueInput, ref } }) => {
				return (
					<>
						<input
							type="radio"
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							checked={valueInput?.toString() === value?.toString()}
							ref={ref}
						/>
						<p className="font-normal tracking-tighter">{text}</p>
					</>
				);
			}}
			{...props}
		/>
	);
});

InputRadio.propTypes = {
	control: PropTypes.object,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool,
		PropTypes.number,
	]),
	text: PropTypes.string,
};

export default InputRadio;
