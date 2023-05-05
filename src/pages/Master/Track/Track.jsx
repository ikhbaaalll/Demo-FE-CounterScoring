import React, { useMemo, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import {
	ActionButton,
	Button,
	Cell,
	CellHeader,
	Input,
	InputSelect,
} from "@components/atoms";
import { Spinner } from "@components/moleculs";
import { Modal, Table } from "@components/organisms";

import { useCreateData } from "@hooks/useCreateData";
import { useQueryTable } from "@hooks/useQueryTable";
import { useUpdateData } from "@hooks/useUpdateData";

import TrackService from "@services/api/Master/TrackService";
import { getPaginationPage } from "@services/helper";

import Error from "@templates/Error";
import Pages from "@templates/Pages";

import { MODAL_STATUS } from "@utils/constant";
import { useDeleteData } from "@hooks/useDeleteData";
import BusinessUnitService from "@services/api/Master/BusinessUnitService";
import { useCustomQuery } from "@hooks/useCustomQuery";

const columnHelper = createColumnHelper();

const Track = () => {
	const columns = useMemo(
		() =>
			({ onClickEdit, onClickDelete }) =>
				[
					columnHelper.accessor("name", {
						header: <CellHeader value={"Name"} />,
						cell: (info) => <Cell value={info.getValue()} />,
					}),
					columnHelper.accessor("business_units.name", {
						header: <CellHeader value={"Business Unit"} />,
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
			getAll: TrackService.get,
			queryKey: "trackData",
		});

	const handleOpenModal = ({ title, status }) =>
		setModalState({ ...modalState, title, status, isOpen: true });

	const handleCloseModal = () =>
		setModalState({ ...modalState, isOpen: false });

	const onClickEdit = (data) => {
		setModalState({
			title: "Edit Track " + data.name,
			status: MODAL_STATUS.UPDATE,
			isOpen: true,
			data,
		});
	};

	const onClickDelete = (data) => {
		setModalState({
			title: "Delete Track",
			status: MODAL_STATUS.DELETE,
			isOpen: true,
			data,
		});
	};

	const {
		data: businessUnit,
		isFetching: businessUnitFetching,
		isLoading: businessUnitLoading,
	} = useCustomQuery({
		api: BusinessUnitService.get,
		queryKey: "allBusinessUnit",
		enabled: [MODAL_STATUS.CREATE, MODAL_STATUS.UPDATE].includes(
			modalState.status,
		),
		keepPreviousData: true,
	});

	const {
		registerCreate,
		onSubmitCreate,
		handleSubmitCreate,
		errorsCreate,
		controlCreate,
	} = useCreateData({
		invalidateQueries: ["trackData", "allTrack"],
		api: TrackService.create,
		handleCloseModal,
	});

	const {
		registerUpdate,
		onSubmitUpdate,
		handleSubmitUpdate,
		errorsUpdate,
		controlUpdate,
	} = useUpdateData({
		invalidateQueries: ["trackData", "allTrack"],
		api: TrackService.update,
		handleCloseModal: handleCloseModal,
		defaultValues: modalState.data,
	});

	const { onSubmitDelete } = useDeleteData({
		invalidateQueries: ["trackData", "allTrack"],
		api: TrackService.delete,
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
				title="Track Name"
				{...registerCreate("name", {
					required: "Name is required",
				})}
				error={errorsCreate.name}
			/>
			<InputSelect
				title="Business Unit"
				control={controlCreate}
				isRequired={true}
				placeholder="Select Location Category"
				data={businessUnit?.map((item) => ({
					label: item.name,
					value: item.id,
				}))}
				{...registerCreate("business_unit_id", {
					valueAsNumber: true,
					required: "Business Unit is required",
				})}
				error={errorsCreate.business_unit_id}
			/>
			<Button
				text="Save Track"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formUpdateLocation = (
		<form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
			<Input
				title="Track Name"
				isRequired={true}
				{...registerUpdate("name", {
					required: "Name is required",
				})}
				error={errorsUpdate.name}
			/>
			<InputSelect
				title="Location Category"
				control={controlUpdate}
				isRequired={true}
				data={businessUnit?.map((item) => ({
					label: item.name,
					value: item.id,
				}))}
				{...registerCreate("business_unit_id", {
					valueAsNumber: true,
					required: "Business Unit is required",
				})}
				error={errorsUpdate.business_unit_id}
			/>
			<Button
				text="Save Track"
				type="submit"
				mergeClass="bg-primary-600 w-fit text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const formDeleteLocation = (
		<div className="flex flex-col gap-3">
			<p>Delete Track {modalState.data.name}?</p>
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
					text="Add Track"
					onClick={() =>
						handleOpenModal({
							title: "Add Track",
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
				{businessUnitFetching || businessUnitLoading ? (
					<Spinner />
				) : (
					renderForm()
				)}
			</Modal>
		</>
	);
};

export default Pages({
	Component: Track,
	title: "Track",
});
