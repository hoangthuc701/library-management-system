const db = require('../utils/db');

const TBL_BOOK_STATUS = 'book_status';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_BOOK_STATUS}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_BOOK_STATUS} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_BOOK_STATUS, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_BOOK_STATUS, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_BOOK_STATUS, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_BOOK_STATUS}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_BOOK_STATUS}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_BOOK_STATUS} LIMIT 10 OFFSET ${offset}`)
    }
}
