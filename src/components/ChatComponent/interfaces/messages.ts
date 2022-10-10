export interface IMessageResponse {
	messages: Array<IMessage>
}

export interface IMessage {
	id: number
	create_at: string
	updated_at: string
	message: string
	blocked: boolean
	username: string
	user_id: number
}
