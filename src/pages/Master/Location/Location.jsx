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

import LocationService from "@services/api/Master/LocationService";
import { getPaginationPage } from "@services/helper";

import Error from "@templates/Error";
import Pages from "@templates/Pages";

import { MODAL_STATUS } from "@utils/constant";
import { useDeleteData } from "@hooks/useDeleteData";

const columnHelper = createColumnHelper();

const Location = () => {
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
			getAll: LocationService.get,
			queryKey: "locationData",
		});

	const handleOpenModal = ({ title, status }) =>
		setModalState({ ...modalState, title, status, isOpen: true });

	const handleCloseModal = () =>
		setModalState({ ...modalState, isOpen: false });

	const onClickEdit = (data) => {
		setModalState({
			title: "Edit Location " + data.name,
			status: MODAL_STATUS.UPDATE,
			isOpen: true,
			data,
		});
	};

	const onClickDelete = (data) => {
		setModalState({
			title: "Delete Location",
			status: MODAL_STATUS.DELETE,
			isOpen: true,
			data,
		});
	};

	const { registerCreate, onSubmitCreate, handleSubmitCreate, errorsCreate } =
		useCreateData({
			invalidateQueries: ["locationData", "allLocation"],
			api: LocationService.create,
			handleCloseModal,
		});

	const { registerUpdate, onSubmitUpdate, handleSubmitUpdate, errorsUpdate } =
		useUpdateData({
			invalidateQueries: ["locationData", "allLocation"],
			api: LocationService.update,
			handleCloseModal: handleCloseModal,
			defaultValues: modalState.data,
		});

	const { onSubmitDelete } = useDeleteData({
		invalidateQueries: ["locationData", "allLocation"],
		api: LocationService.delete,
		handleCloseModal: handleCloseModal,
	});

	const transformData = (data, e, onSubmit) => {
		onSubmit(data, e);
	};

	const formCreateLocation = (
		<form
			onSubmit={handleSubmitCreate((data, e) =>
				transformData(data, e, onSubmitCreate),
			)}
		>
			<Input
				title="Location Name"
				{...registerCreate("name", {
					required: "Name is required",
				})}
				error={errorsCreate.name}
			/>
			<Button
				text="Save Location"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formUpdateLocation = (
		<form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
			<Input
				title="Location Name"
				isRequired={true}
				{...registerUpdate("name", {
					required: "Name is required",
				})}
				error={errorsUpdate.name}
			/>
			<Button
				text="Save Location"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formDeleteLocation = (
		<div className="flex flex-col gap-3">
			<p>Delete Location {modalState.data.name}?</p>
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
			return formCreateLocation;
		}

		if (modalState.status === MODAL_STATUS.UPDATE) {
			return formUpdateLocation;
		}

		return formDeleteLocation;
	};

	if (isLoading || isFetching) return <Spinner />;

	if (error) return <Error error={error} />;

	return (
		<>
			<div className="w-auto">
				<Button
					text="Add Location"
					onClick={() =>
						handleOpenModal({
							title: "Add Location",
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
	Component: Location,
	title: "Location",
});
