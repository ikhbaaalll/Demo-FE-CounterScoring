import TrackDAL from "@services/DAL/Master/TrackDAL";

export default {
	get: (data) => TrackDAL.getTracks(data),
	create: ({ data }) => TrackDAL.createTrack(data),
	update: ({ data }) => TrackDAL.updateTrack(data),
	delete: (id) => TrackDAL.deleteTrack(id),
};
