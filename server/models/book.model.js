const db = require('../utils/db');

const TBL_BOOK = 'Book';

exports.getAll = () => db.load(`select * from ${TBL_BOOK}`);

exports.getByID = (ID) => db.load(`select * from ${TBL_BOOK} where id = '${ID}'`);

exports.add = (entity) => db.add(TBL_BOOK, entity);

exports.update = (entity) => {
	const condition = {
		id: entity.id,
	};
	return db.patch(TBL_BOOK, entity, condition);
};

exports.delete = (ID) => {
	const condition = {
		id: ID,
	};
	return db.del(TBL_BOOK, condition);
};
