import axios from 'axios';

export const signin = async (email: string, password: string) => {
	const req = await axios.request({
		method: 'POST',
		url: 'http://localhost:3000/users/login',
		data: {
			email,
			password,
		},
	});

	return req;
};

// export const getPaymentIntent = async (userDetails: Object) => {
// 	const paymentIntent = await axios.request({
// 		withCredentials: true,
// 		method: 'POST',
// 		url: !isDev() ? `${projectURLS.productionWithAPI}/payment/create-intent` : `${projectURLS.development}/api/payment/create-intent`,

// 		data: {
// 			userDetails,
// 		},
// 	});

// 	return paymentIntent;
// };
