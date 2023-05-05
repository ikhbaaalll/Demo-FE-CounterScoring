import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

const InputSelect = forwardRef(
	(
		{
			title = false,
			isRequired = true,
			isMultiple = false,
			placeholder = false,
			data,
			control,
			error,
			positionMenu = "relative",
			mergeClass = "",
			isDisabled = false,
			onInputChange,
			...props
		},
		ref,
	) => {
		return (
			<div
				className={`flex flex-col gap-1 ${!title ? "" : "mt-3"} ${mergeClass}`}
			>
				{title ? (
					<span className="text-sm font-semibold">
						{title}
						{isRequired && <span className="text-red-500 font-normal"> *</span>}
					</span>
				) : null}
				<Controller
					name={title}
					control={control}
					render={({
						field: { value, onChange, onBlur },
						formState: { defaultValues },
					}) => {
						return (
							<>
								<ReactSelect
									isDisabled={isDisabled}
									styles={{
										control: (baseStyles) => ({
											...baseStyles,
											border: "1px solid #d49904",
											boxShadow: "none",
											"&:hover": {
												border: "1px solid #d49904",
											},
											borderRadius: "6px",
										}),
										menu: (baseStyles) => ({
											...baseStyles,
											position: positionMenu,
										}),
										multiValue: (baseStyles) => ({
											...baseStyles,
											backgroundColor: "transparent",
										}),
										multiValueLabel: (baseStyles) => ({
											...baseStyles,
											backgroundColor: "#d49904",
											color: "white",
											borderWidth: 0,
											borderRadius: 0,
											borderTopLeftRadius: "10px",
											borderBottomLeftRadius: "10px",
										}),
										multiValueRemove: (baseStyles) => ({
											...baseStyles,
											backgroundColor: "#d49904",
											color: "#d6d6d6",
											borderRadius: 0,
											borderWidth: 0,
											borderTopRightRadius: "10px",
											borderBottomRightRadius: "10px",
											"&:hover": {
												backgroundColor: "#d49904",
												color: "white",
											},
										}),
										dropdownIndicator: (baseStyles) => ({
											...baseStyles,
											color: "black",
										}),
									}}
									options={data}
									placeholder={placeholder || "Select " + title}
									isMulti={isMultiple}
									closeMenuOnSelect={!isMultiple}
									isSearchable={true}
									onInputChange={(o) => {
										if (onInputChange !== undefined) {
											onInputChange(o);
										}
									}}
									onChange={(options) => {
										onChange(
											isMultiple
												? options?.map((option) => option.value)
												: options.value,
										);
									}}
									ref={ref}
									onBlur={onBlur}
									defaultValue={defaultValues}
									value={
										isMultiple
											? data?.filter((option) => value?.includes(option.value))
											: data?.find((option) => option.value === value) ||
											  placeholder ||
											  "Select " + title
									}
								/>
								{error && (
									<span className="text-sm text-red-500">
										* {error.message}
									</span>
								)}
							</>
						);
					}}
					{...props}
				/>
			</div>
		);
	},
);

InputSelect.displayName = "InputSelect";

InputSelect.propTypes = {
	title: PropTypes.string,
	isRequired: PropTypes.bool,
	isMultiple: PropTypes.bool,
	placeholder: PropTypes.string,
	data: PropTypes.array,
	control: PropTypes.any,
	placement: PropTypes.string,
	error: PropTypes.shape({
		message: PropTypes.string,
	}),
	positionMenu: PropTypes.string,
	mergeClass: PropTypes.string,
	isDisabled: PropTypes.bool,
	onInputChange: PropTypes.func,
};

export default InputSelect;
