const db = require('../utils/db');

const TBL_RETURNING_CARD = 'returning_card';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_RETURNING_CARD}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_RETURNING_CARD} where id = ${id}`);
    },
    loadByborrowingCardID: function (id) {
        return db.load(`select * from ${TBL_RETURNING_CARD} where borrowing_card_id = '${id}' order by UNIX_TIMESTAMP(created_at) DESC`);
    },
    insert: function (entity) {
        return db.add(TBL_RETURNING_CARD, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_RETURNING_CARD, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_RETURNING_CARD, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_RETURNING_CARD}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_RETURNING_CARD}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_RETURNING_CARD} order by UNIX_TIMESTAMP(created_at) DESC LIMIT 10 OFFSET ${offset}`)
    }
}
