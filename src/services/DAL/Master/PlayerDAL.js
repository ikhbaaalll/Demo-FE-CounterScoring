import { supabase } from "@configs/supabaseClient";

export default {
	getPlayers: async () => {
		let { data, error } = await supabase.from("players").select();

		return new Promise((resolve, reject) => {
			if (error) {
				reject(error);
			} else {
				resolve(data);
			}
		});
	},
};
