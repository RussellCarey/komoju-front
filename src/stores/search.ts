import { defineStore } from 'pinia';

// Dont really need global for this?
export const useSearchStore = defineStore('searchStore', {
	state: () => ({
		genres: [] as string[],
		platforms: [] as string[],
		tags: [] as string[],
	}),
	getters: {
		get_genres: (state) => state.genres,
		get_platforms: (state) => state.platforms,
		get_tags: (state) => state.tags,
	},
	actions: {
		add_genre(g: string) {
			this.genres.push(g);
		},
		add_platforms(g: string) {
			this.platforms.push(g);
		},
		add_tags(g: string) {
			this.tags.push(g);
		},
	},
});
