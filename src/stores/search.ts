import { defineStore } from "pinia"

// Dont really need global for this?
export const useSearchStore = defineStore("searchStore", {
	state: () => ({
		url: "https://rawg.io/api/games?key=f0411c841de74da1818f464ffe5c0aa5&page_size=40&page=1",
		genres: [] as number[],
		platforms: [] as number[],
		tags: [] as string[],
		search: "" as string,
	}),
	getters: {
		get_genres: (state) => state.genres,
		get_platforms: (state) => state.platforms,
		get_tags: (state) => state.tags,
		get_url: (state) => state.url,
		get_search: (state) => state.search,
	},
	actions: {
		build_url(page = 1) {
			const root = `https://rawg.io/api/games?key=f0411c841de74da1818f464ffe5c0aa5&page_size=20&page=${page}`
			const genres = this.genres.length > 0 ? "&genres=" + this.genres.map((g) => `${g},`) : ""
			const platforms = this.platforms.length > 0 ? "&platforms=" + this.platforms.map((g) => `${g},`) : ""
			const search = this.search.length > 0 ? "&search=" + this.search : ""
			this.url = root + genres + platforms + search
		},
		add_genre(g: number) {
			this.genres.push(g)
			this.build_url()
		},
		remove_genre(g: number) {
			this.genres = this.genres.filter((item) => item !== g)
			this.build_url()
		},
		add_platform(g: number) {
			this.platforms.push(g)
			this.build_url()
		},
		remove_platform(g: number) {
			this.platforms = this.platforms.filter((item) => item !== g)
			this.build_url()
		},
		add_tag(g: string) {
			this.tags.push(g)
			this.build_url()
		},
		remove_tag(g: string) {
			this.tags = this.tags.filter((item) => item !== g)
			this.build_url()
		},
		edit_search(g: string) {
			this.search = g
			this.build_url()
		},
	},
})
