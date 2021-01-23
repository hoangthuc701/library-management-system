const db = require('../utils/db');

const TBL_TITLE = 'book_title';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_TITLE}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_TITLE} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_TITLE, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_TITLE, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_TITLE, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_TITLE}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_TITLE}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_TITLE} LIMIT 10 OFFSET ${offset}`)
    }
}
