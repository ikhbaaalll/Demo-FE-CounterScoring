import { isEmpty } from "lodash";

import { supabase } from "@configs/supabaseClient";

export default {
	getLocations: async (params) => {
		let { count } = await supabase
			.from("locations")
			.select("*", { count: "exact", head: true });

		let query = supabase.from("locations").select();

		if (!isEmpty(params)) {
			const range = params.pageIndex * params.pageSize;

			query = query.range(range, range + params.pageSize - 1);
		}

		let { data, error } = await query;

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve({ data, count });
			}
		});
	},
	createLocation: async ({ name }) => {
		let { data, error } = await supabase
			.from("locations")
			.insert({
				name,
			})
			.select();

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	},
	updateLocation: async ({ id, name }) => {
		let { data, error } = await supabase
			.from("locations")
			.update({
				name,
			})
			.eq("id", id)
			.select();

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	},
	deleteLocation: async (id) => {
		let { data, error } = await supabase
			.from("locations")
			.delete()
			.eq("id", id);

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	},
};
