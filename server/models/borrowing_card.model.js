const db = require('../utils/db');

const TBL_BORROWING_CARD = 'borrowing_card';
const databaseName = 'qltv'
module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_BORROWING_CARD}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_BORROWING_CARD} where id = ${id}`);
    },
    loadByCardID: function (id) {
        return db.load(`select * from ${TBL_BORROWING_CARD} where card_id = '${id}'`);
    },
    insert: function (entity) {
        return db.add(TBL_BORROWING_CARD, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_BORROWING_CARD, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_BORROWING_CARD, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_BORROWING_CARD}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_BORROWING_CARD}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT b.*, a.username FROM ${TBL_BORROWING_CARD} b, account a where b.reader_id = a.id LIMIT 10 OFFSET ${offset}`)
    }
}

