const bcrypt = require('bcrypt');
const round = 10;

exports.getHashedPassword = (password) =>
	new Promise((resolve, reject) => {
		bcrypt.hash(password, round, (err, data) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(data);
			}
		});
	});

exports.comparePassword = (rawPassword, hashedPassword) =>
	new Promise((resolve, reject) => {
		bcrypt.compare(rawPassword, hashedPassword, (err, data) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(data);
			}
		});
	});
