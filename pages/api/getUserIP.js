// pages/api/getUserIP.js

export default (req, res) => {
	const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	res.status(200).json({ ip: userIP });
};
