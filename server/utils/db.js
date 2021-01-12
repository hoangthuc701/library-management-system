const mysql = require('mysql');

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	connectionLimit: 50,
});

module.exports = {
	load: function (sql) {
		return new Promise(function (resolve, reject) {
			pool.query(sql, function (error, results, fields) {
				if (error) {
					return reject(error);
				}

				resolve(results);
			});
		});
	},

	add: function (table, entity) {
		return new Promise(function (resolve, reject) {
			const sql = `insert into ${table} set ?`;
			pool.query(sql, entity, function (error, results) {
				if (error) {
					return reject(error);
				}

				resolve(results);
			});
		});
	},

	patch: function (table, entity, condition) {
		return new Promise(function (resolve, reject) {
			const sql = `update ${table} set ? where ?`;
			pool.query(sql, [entity, condition], function (error, results) {
				if (error) {
					return reject(error);
				}

				resolve(results);
			});
		});
	},

	del: function (table, condition) {
		return new Promise(function (resolve, reject) {
			const sql = `delete from ${table} where ?`;
			pool.query(sql, condition, function (error, results) {
				if (error) {
					return reject(error);
				}

				resolve(results);
			});
		});
	},
};
