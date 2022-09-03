import { defineStore } from 'pinia';

interface Test {
	name: string;
}

export const useSearchStore = defineStore('searchStore', {
	state: () => ({
		genres: [] as string[],
		platforms: [] as string[],
		tags: [] as string[],
	}),
	getters: {
		genres: (state) => state.genres,
		platforms: (state) => state.platforms,
		tags: (state) => state.tags,
	},
	actions: {
		addGenre(g: string) {
			this.genres.push(g);
		},
		addPlatform(g: string) {
			this.platforms.push(g);
		},
		addTags(g: string) {
			this.tags.push(g);
		},
	},
});
