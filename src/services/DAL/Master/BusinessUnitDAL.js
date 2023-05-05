import { isEmpty } from "lodash";

import { supabase } from "@configs/supabaseClient";

export default {
	getBusinessUnits: async (params) => {
		let { count } = await supabase
			.from("business_units")
			.select("*", { count: "exact", head: true });

		let query = supabase.from("business_units").select();

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
	createBusinessUnit: async ({ name }) => {
		let { data, error } = await supabase
			.from("business_units")
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
	updateBusinessUnit: async ({ id, name }) => {
		let { data, error } = await supabase
			.from("business_units")
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
	deleteBusinessUnit: async (id) => {
		let { data, error } = await supabase
			.from("business_units")
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
