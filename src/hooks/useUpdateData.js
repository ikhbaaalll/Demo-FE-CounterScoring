import { useEffect } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";

export const useUpdateData = ({
	invalidateQueries = [],
	api,
	handleCloseModal = null,
	defaultValues,
	mergeKeys = {},
	resolver,
	onSuccessMessage = "Success Edit Data",
}) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
		getValues,
		trigger,
		setValue,
		setError,
		clearErrors,
	} = useForm({
		reValidateMode: "onBlur",
		// resolver: resolver ? yupResolver(resolver) : null,
	});

	const queryClient = useQueryClient();

	const onSubmit = async (data, e, isFormData = false) => {
		e.preventDefault();
		if (isFormData) {
			mutation.mutate(data);
		} else {
			mutation.mutate({
				...data,
				createdAt: new Date().toISOString(),
			});
		}
	};

	useEffect(() => {
		if (!isEmpty(defaultValues)) {
			reset({ ...defaultValues, ...mergeKeys });
		}
	}, [defaultValues]);

	const mutation = useMutation({
		mutationFn: (data) => api({ data }),
		onSuccess: () => {
			invalidateQueries?.map(
				async (key) => await queryClient.invalidateQueries({ queryKey: [key] }),
			);
			reset();

			handleCloseModal ? handleCloseModal() : null;
			toast.success(onSuccessMessage);
		},
		onError: (err) => toast.error(err?.message || "Something went wrong"),
	});

	return {
		registerUpdate: register,
		onSubmitUpdate: onSubmit,
		handleSubmitUpdate: handleSubmit,
		errorsUpdate: errors,
		controlUpdate: control,
		getValuesUpdate: getValues,
		triggerUpdate: trigger,
		setValueUpdate: setValue,
		setErrorUpdate: setError,
		clearErrorsUpdate: clearErrors,
	};
};
