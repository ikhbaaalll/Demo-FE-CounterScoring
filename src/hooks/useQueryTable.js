import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const useQueryTable = ({
	queryKey,
	getAll,
	staleTime = 60 * 1 * 1000,
	queryParams = {},
}) => {
	const [{ pageIndex, pageSize, ...state }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
		...queryParams,
	});

	const params = {
		pageIndex,
		pageSize,
		...queryParams,
	};

	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: [queryKey, { ...params, queryParams }],
		queryFn: () => getAll({ ...params, ...queryParams }),
		keepPreviousData: true,
		select: (res) => res,
		staleTime: staleTime,
	});

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize,
			state,
		}),
		[pageIndex, pageSize, state],
	);

	return {
		data,
		isFetching,
		isLoading,
		error,
		setPagination,
		pagination,
	};
};
