import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteData = ({
	invalidateQueries = [],
	api,
	handleCloseModal,
	message = "Success Delete Data",
}) => {
	const queryClient = useQueryClient();

	const onSubmit = async (id) => {
		mutation.mutate(id);
	};

	const mutation = useMutation({
		mutationFn: async (id) => await api(id),
		onSuccess: () => {
			invalidateQueries?.map((key) =>
				queryClient.invalidateQueries({ queryKey: [key] }),
			);
			handleCloseModal();
			toast.success(message);
		},
		onError: (err) => toast.error(err.message),
	});

	return {
		message: message,
		onSubmitDelete: onSubmit,
	};
};
