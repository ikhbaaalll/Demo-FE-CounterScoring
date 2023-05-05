import LocationDAL from "@services/DAL/Master/LocationDAL";

export default {
	get: (data) => LocationDAL.getLocations(data),
	create: ({ data }) => LocationDAL.createLocation(data),
	update: ({ data }) => LocationDAL.updateLocation(data),
	delete: (id) => LocationDAL.deleteLocation(id),
};
