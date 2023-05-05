import PlayerDAL from "@services/DAL/Master/PlayerDAL";

export default {
	get: () => PlayerDAL.getPlayers(),
};
