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
        return db.load(`SELECT b.*, a.username FROM ${TBL_BORROWING_CARD} b, account a where b.reader_id = a.id order by UNIX_TIMESTAMP(b.created_at) DESC LIMIT 10 OFFSET ${offset}`)
    },
    loadByAccountID: (id) =>{
        return db.load(`SELECT b.* FROM ${TBL_BORROWING_CARD} b where b.reader_id = ${id} order by UNIX_TIMESTAMP(b.created_at) DESC`)
    },
    searchDate: (date, todate, offset) =>{
        return db.load(`select b.*, a.username from ${TBL_BORROWING_CARD} b, account a where b.reader_id = a.id and b.created_at BETWEEN '${date}' and '${todate}' order by b.created_at DESC limit 10 offset ${offset}`)
    },
}

