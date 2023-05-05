import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const useCreateData = ({
	invalidateQueries = [],
	api,
	handleCloseModal = null,
	defaultValues = {},
	onSuccessMessage = "Success Create Data",
}) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
		watch,
	} = useForm({
		defaultValues: { ...defaultValues },
		reValidateMode: "onBlur",
	});

	const queryClient = useQueryClient();

	const onSubmit = async (data, e, isFormData = false) => {
		e.preventDefault();

		if (isFormData) {
			mutation.mutate(data);
		} else {
			mutation.mutate(data);
		}
	};

	const mutation = useMutation({
		mutationFn: (data) => api({ data }),
		onSuccess: () => {
			invalidateQueries?.map((key) =>
				queryClient.invalidateQueries({ queryKey: [key] }),
			);
			reset();
			handleCloseModal && handleCloseModal();
			toast.success(onSuccessMessage);
		},
		onError: (err) => toast.error(err.message),
	});

	return {
		registerCreate: register,
		onSubmitCreate: onSubmit,
		handleSubmitCreate: handleSubmit,
		errorsCreate: errors,
		controlCreate: control,
		watchCreate: watch,
	};
};
