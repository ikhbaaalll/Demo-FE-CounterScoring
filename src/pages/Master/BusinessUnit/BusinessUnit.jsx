import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import {
	ActionButton,
	Button,
	Cell,
	CellHeader,
	Input,
} from "@components/atoms";
import { Spinner } from "@components/moleculs";
import { Modal, Table } from "@components/organisms";

import { useCreateData } from "@hooks/useCreateData";
import { useQueryTable } from "@hooks/useQueryTable";
import { useUpdateData } from "@hooks/useUpdateData";

import BusinessUnitService from "@services/api/Master/BusinessUnitService";
import { getPaginationPage } from "@services/helper";

import Error from "@templates/Error";
import Pages from "@templates/Pages";

import { MODAL_STATUS } from "@utils/constant";
import { useDeleteData } from "@hooks/useDeleteData";

const columnHelper = createColumnHelper();

const BusinessUnit = () => {
	const columns = useMemo(
		() =>
			({ onClickEdit, onClickDelete }) =>
				[
					columnHelper.accessor("name", {
						header: <CellHeader value={"Name"} />,
						cell: (info) => <Cell value={info.getValue()} />,
					}),
					columnHelper.accessor("actions", {
						header: <CellHeader value={"Action"} mergeClass="text-center" />,
						cell: ({ row }) => (
							<ActionButton
								data={row.original}
								onClickEdit={onClickEdit}
								onClickDelete={onClickDelete}
							/>
						),
					}),
				],
		[],
	);

	const [modalState, setModalState] = useState({
		title: "",
		status: "",
		isOpen: false,
		data: {},
	});

	const { data, isFetching, isLoading, pagination, setPagination, error } =
		useQueryTable({
			getAll: BusinessUnitService.get,
			queryKey: "businessUnitData",
		});

	const handleOpenModal = ({ title, status }) =>
		setModalState({ ...modalState, title, status, isOpen: true });

	const handleCloseModal = () =>
		setModalState({ ...modalState, isOpen: false });

	const onClickEdit = (data) => {
		setModalState({
			title: "Edit Business Unit " + data.name,
			status: MODAL_STATUS.UPDATE,
			isOpen: true,
			data,
		});
	};

	const onClickDelete = (data) => {
		setModalState({
			title: "Delete Business Unit",
			status: MODAL_STATUS.DELETE,
			isOpen: true,
			data,
		});
	};

	const { registerCreate, onSubmitCreate, handleSubmitCreate, errorsCreate } =
		useCreateData({
			invalidateQueries: ["businessUnitData", "allBusinessUnit"],
			api: BusinessUnitService.create,
			handleCloseModal,
		});

	const { registerUpdate, onSubmitUpdate, handleSubmitUpdate, errorsUpdate } =
		useUpdateData({
			invalidateQueries: ["businessUnitData", "allBusinessUnit"],
			api: BusinessUnitService.update,
			handleCloseModal: handleCloseModal,
			defaultValues: modalState.data,
		});

	const { onSubmitDelete } = useDeleteData({
		invalidateQueries: ["businessUnitData", "allBusinessUnit"],
		api: BusinessUnitService.delete,
		handleCloseModal: handleCloseModal,
	});

	const transformData = (data, e, onSubmit) => {
		onSubmit(data, e);
	};

	const formCreateBusinessUnit = (
		<form
			onSubmit={handleSubmitCreate((data, e) =>
				transformData(data, e, onSubmitCreate),
			)}
		>
			<Input
				title="Business Unit Name"
				{...registerCreate("name", {
					required: "Name is required",
				})}
				error={errorsCreate.name}
			/>
			<Button
				text="Save Business Unit"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formUpdateBusinessUnit = (
		<form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
			<Input
				title="Business Unit Name"
				isRequired={true}
				{...registerUpdate("name", {
					required: "Name is required",
				})}
				error={errorsUpdate.name}
			/>
			<Button
				text="Save Business Unit"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formDeleteBusinessUnit = (
		<div className="flex flex-col gap-3">
			<p>Delete Business Unit {modalState.data.name}?</p>
			<div className="flex flex-row gap-4">
				<Button
					onClick={handleCloseModal}
					text="Cancel"
					mergeClass="bg-slate-400 text-sm p-1 hover:bg-slate-500"
					size="w-24"
				/>
				<Button
					onClick={() => onSubmitDelete(modalState.data.id)}
					text="Yes"
					mergeClass="bg-error-500 text-sm p-1 hover:bg-error-700"
					size="w-24"
				/>
			</div>
		</div>
	);

	const renderForm = () => {
		if (modalState.status === MODAL_STATUS.CREATE) {
			return formCreateBusinessUnit;
		}

		if (modalState.status === MODAL_STATUS.UPDATE) {
			return formUpdateBusinessUnit;
		}

		return formDeleteBusinessUnit;
	};

	if (isLoading || isFetching) return <Spinner />;

	if (error) return <Error error={error} />;

	return (
		<>
			<div className="w-auto">
				<Button
					text="Add Business Unit"
					onClick={() =>
						handleOpenModal({
							title: "Add Business Unit",
							status: MODAL_STATUS.CREATE,
						})
					}
					size="w-fit"
					onRight={true}
				/>
			</div>
			<Table
				columns={columns({
					onClickEdit,
					onClickDelete,
				})}
				data={data.data ?? []}
				pageCount={getPaginationPage(data.count, pagination.pageSize)}
				state={pagination}
				setPagination={setPagination}
				total={data.count}
			/>
			<Modal
				title={modalState.title}
				isOpen={modalState.isOpen}
				handleCloseModal={handleCloseModal}
				mergeClassPanel="mx-4"
			>
				{renderForm()}
			</Modal>
		</>
	);
};

export default Pages({
	Component: BusinessUnit,
	title: "BusinessUnit",
});
