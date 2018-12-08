export interface VideoListConfig {
	type: string;

	filters: {
		label?: string,
		limit?: number,
		offset?: number
	};
}