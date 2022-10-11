import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const insert = async ({ table, data }) => {
	const response = await supabase.from(table).insert(data).select();
	if (response.error) {
		console.log(response.error);
		throw new Error("insert failed");
	} else if (response.data) return response.data;
	return undefined;
};

export const update = async ({ table, column, value, id }) => {
	const response = await supabase
		.from(table)
		.update({ [column]: value })
		.eq("id", id);

	if (response.error) {
		console.log(response.error);
		throw new Error("update failed");
	} else if (response.data) return response.data;
	return undefined;
};
