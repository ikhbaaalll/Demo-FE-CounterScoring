import BusinessUnitDAL from "@services/DAL/Master/BusinessUnitDAL";

export default {
	get: (data) => BusinessUnitDAL.getBusinessUnits(data),
	create: ({ data }) => BusinessUnitDAL.createBusinessUnit(data),
	update: ({ data }) => BusinessUnitDAL.updateBusinessUnit(data),
	delete: (id) => BusinessUnitDAL.deleteBusinessUnit(id),
};
