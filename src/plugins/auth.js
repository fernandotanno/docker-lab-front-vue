import decode from 'jwt-decode';

export async function signIn(email, password) {
	const token = await this.$http.post('login', {
		email,
		password
	});
	localStorage.set('token', token);
}

export function signOut() {
	localStorage.removeItem('token');
}

export function isSignedIn() {
	const token = localStorage.getItem('token');

	if (!token) return false;

	try {
		const { exp: expiration } = decode(token);
		const isExpired = !!expiration && Date.now() > expiration * 1000;

		if (isExpired) return false;

		return true;
	} catch (_) {
		return false;
	}
}
