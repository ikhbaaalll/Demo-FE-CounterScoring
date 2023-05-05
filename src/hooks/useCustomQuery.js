import { useQuery } from "@tanstack/react-query";

export const useCustomQuery = ({
	api,
	queryKey,
	enabled = true,
	keepPreviousData = false,
	staleTime = 60 * 15 * 1000,
	queryParams = {},
}) => {
	const { data, isFetching, isLoading, error } = useQuery({
		queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
		queryFn: async () => await api({ ...queryParams }),
		enabled,
		keepPreviousData,
		staleTime,
		select: (res) => res.data,
	});

	return { data, isFetching, isLoading, error };
};
