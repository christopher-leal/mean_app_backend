const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.OAUTH_CLIENT);

async function googleVerify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.OAUTH_CLIENT // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	return payload;
	// If request specified a G Suite domain:
	// const domain = payload['hd'];
}

module.exports = { googleVerify };
