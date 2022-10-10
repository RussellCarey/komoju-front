import { IOptions } from "./interfaces/interfaces"

class SocketConnection {
	private channel: string | undefined
	private room: string | undefined
	private connected: () => void
	private rejected: () => void
	private received: (data: any) => void
	private disconnected: () => void
	private cable: any

	constructor(cable: any, options: IOptions) {
		this.channel = options.name
		this.room = options.status
		this.connected = options.connected
		this.rejected = options.rejected
		this.received = options.received
		this.disconnected = options.disconnected
		this.cable = cable
		this.subscribe()
	}

	// Subscribe to the web socket data provided
	private subscribe() {
		this.cable.subscribe({
			channel: this.channel,
			room: this.room,
			connected: this.connected,
			rejected: this.rejected,
			received: this.received,
			disconnected: this.disconnected,
		})
	}

	public sendChatMessage(message: string) {
		this.cable.perform({
			channel: this.channel,
			action: "send_message",
			data: {
				content: message,
			},
		})
	}
}

export default SocketConnection
