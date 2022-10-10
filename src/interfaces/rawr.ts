export interface rawrResponse {
	data: rawrData
	header: rawHeader
	status: number
	statusText: string
}

interface rawrData {
	count: number
	description: string
	next: string
	results: rawrResults[]
}

interface rawrResults {
	background_image: string
	dominant_color: string
	id: number
	name: string
	metacritic: number
	rating: number
	image: string
	platforms: rawrPlatform[]
}

export interface rawrPlatform {
	platform: rawrPlatformData
}

interface rawrPlatformData {
	id: string
	name: string
}

interface rawHeader {
	["content-language"]: string
	["content-type"]: string
}
