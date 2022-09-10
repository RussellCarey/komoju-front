export interface User {
	id: number
	email: string
	created_at: string
	updated_at: string
	first_name: string
	last_name: string
	username: string
	phone_number: string
	reg_token: number
	authorized_at: string | null
	prefered_contact: string
	is_admin: boolean
	token_count: number
	komoju_customer: string
}
