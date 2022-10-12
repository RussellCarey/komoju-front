export interface IOptions {
	name?: string
	status?: "public" | "private"
	room: string
	connected: () => void
	rejected: () => void
	received: (data: any) => void
	disconnected: () => void
}

export interface ISocketConnection {
	channel: string
	status: "public" | "private"
	connected: () => void
	rejected: () => void
	received: (data: any) => void
	disconnected: () => void
}
