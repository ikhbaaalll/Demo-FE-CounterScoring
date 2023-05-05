import { isEmpty } from "lodash";

import { supabase } from "@configs/supabaseClient";

export default {
	getTracks: async (params) => {
		let { count } = await supabase
			.from("tracks")
			.select("*", { count: "exact", head: true });

		let query = supabase.from("tracks").select("*, business_units (name)");

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
	createTrack: async ({ name, business_unit_id }) => {
		let { data, error } = await supabase
			.from("tracks")
			.insert({
				name,
				business_unit_id,
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
	updateTrack: async ({ id, name, business_unit_id }) => {
		let { data, error } = await supabase
			.from("tracks")
			.update({
				name,
				business_unit_id,
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
	deleteTrack: async (id) => {
		let { data, error } = await supabase.from("tracks").delete().eq("id", id);

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	},
};
