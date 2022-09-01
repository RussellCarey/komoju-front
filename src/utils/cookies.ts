export const setCookie = (days: number, name: string, data: string) => {
	const date = new Date(Date.now() + days);
	const expires = 'expires=' + date.toUTCString();
	document.cookie = `${name}=` + data + ';' + expires + ';path=/';
};
