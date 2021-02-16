const db = require('../utils/db');

const TBL_BOOK = 'Book';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_BOOK}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_BOOK} where id = ${id}`);
    },
    loadByBookTitleID: function (id) {
        return db.load(`select * from ${TBL_BOOK} where book_title_id = ${id} and status = 1`);
    },
    insert: function (entity) {
        return db.add(TBL_BOOK, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_BOOK, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_BOOK, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_BOOK}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_BOOK}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_BOOK} LIMIT 10 OFFSET ${offset}`)
    }
}

