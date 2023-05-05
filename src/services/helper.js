export const getPaginationPage = (count = 1, pageSize) => {
	const mod = count % pageSize;
	const getNext = mod !== 0 ? 1 : 0;
	const totalPage = parseInt(count / pageSize) + getNext;

	return totalPage;
};
