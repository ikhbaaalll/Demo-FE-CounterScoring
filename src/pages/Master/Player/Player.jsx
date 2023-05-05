import React, { useState } from "react";

import { Button, Input, InputSelect } from "@components/atoms";
import { Modal } from "@components/organisms";

import { useCreateData } from "@hooks/useCreateData";

import PlayerService from "@services/api/Master/PlayerService";

import Pages from "@templates/Pages";

import { MODAL_STATUS } from "@utils/constant";

const Player = () => {
	const [modalState, setModalState] = useState({
		title: "",
		status: "",
		isOpen: false,
		data: {},
	});

	const handleOpenModal = ({ title, status }) =>
		setModalState({ ...modalState, title, status, isOpen: true });

	const handleCloseModal = () =>
		setModalState({ ...modalState, isOpen: false });

	const {
		registerCreate,
		onSubmitCreate,
		handleSubmitCreate,
		errorsCreate,
		controlCreate,
	} = useCreateData({
		invalidateQueries: ["usersData"],
		api: PlayerService.get,
		handleCloseModal,
	});

	const transformData = (data, e, onSubmit) => {
		console.log(data);
		// onSubmit(data, e);
	};

	const formCreateUser = (
		<form
			onSubmit={handleSubmitCreate((data, e) =>
				transformData(data, e, onSubmitCreate),
			)}
		>
			<Input
				title="Player Name"
				{...registerCreate("name")}
				error={errorsCreate.name}
			/>
			{/* <InputSelect
				control={controlCreate}
				title="Role"
				isMultiple={true}
				isRequired={true}
				data={roles?.data?.data?.map((item) => ({
					label: item.roleName,
					value: item.id,
				}))}
				{...registerCreate("roles")}
				error={errorsCreate.roles}
			/> */}
			<Button
				text="Save Player"
				type="submit"
				mergeClass="bg-primary-600 w-24 text-sm my-4 text-red hover:bg-primary-400"
				onRight={true}
			/>
		</form>
	);

	const renderForm = () => {
		if (modalState.status === MODAL_STATUS.CREATE) {
			return formCreateUser;
		}

		// if (modalState.status === MODAL_STATUS.UPDATE) {
		// 	return updateUserForm;
		// }

		// return deleteUserForm;
	};

	return (
		<>
			<div className="w-auto">
				<Button
					text="Add User"
					onClick={() =>
						handleOpenModal({
							title: "Add Player",
							status: MODAL_STATUS.CREATE,
						})
					}
					onRight={true}
				/>
			</div>
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
	Component: Player,
	title: "Player",
});
