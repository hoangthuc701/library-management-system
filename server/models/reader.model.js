const db = require('../utils/db');

const TBL_READER_CARD = 'reader_card';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_READER_CARD}`);
    },
    loadByID: function (id) {
        return db.load(`select r.*, a.username from ${TBL_READER_CARD} r, account a where r.account_id = a.id and r.id = ${id}`);
    },
    loadByUserID: function(UserID){
        return db.load(`select * from ${TBL_READER_CARD} where account_id = ${UserID}`);
    },
    insert: function (entity) {
        return db.add(TBL_READER_CARD, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_READER_CARD, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_READER_CARD, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_READER_CARD}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_READER_CARD}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT r.*, a.username FROM ${TBL_READER_CARD} r, account a where r.account_id = a.id order by UNIX_TIMESTAMP(r.created_date) DESC LIMIT 10 OFFSET ${offset}`)
    }
}
