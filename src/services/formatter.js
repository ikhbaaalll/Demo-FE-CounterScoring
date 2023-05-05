import moment from "moment";

export const cellFormatter = (value, type, shorten, maxChar = 50) => {
	if (!value) return "-";

	switch (type) {
		case "string":
			return shorten ? shortenLongText(value, maxChar) : value;
		case "array":
			return value.length ? value.join(", ") : "-";
		case "date":
			return formatDateMonthName(value);
		default:
			return value;
	}
};

export const dateObjectToDateISO = (date) =>
	moment(date).add(1, "day").toISOString();

export const dateGMTToDateObject = (date) => (date ? new Date(date) : null);

export const dateObjectToDMY = (date) => new Date(date).toDateString();

export const dateObjectToMonth = (date) => moment(date).format("MM");

export const formatDate = (date, format = "DD-MM-YYYY") =>
	date ? moment(date).format(format) : moment().format(format);

export const formatDateMonthName = (date, format = "DD-MMM-YYYY") =>
	moment(date).format(format);

export const shortenLongText = (text, maxChar = 50) =>
	text
		? text.length > maxChar
			? text.substring(0, maxChar) + "..."
			: text
		: "-";

export const dateObjectToCustomFormat = (date, format, add = 1, unit = "day") =>
	date ? moment(date).add(add, unit).format(format) : "";

export const capitalizeFirstLetter = (text) =>
	text.replace(/^./, text[0].toUpperCase());

export const numberWithDelimeter = (val, delimeter = ".") =>
	val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimeter);
