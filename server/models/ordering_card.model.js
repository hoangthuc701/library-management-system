const db = require('../utils/db');

const TBL_ORDERING_CARD = 'ordering_card';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_ORDERING_CARD}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_ORDERING_CARD} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_ORDERING_CARD, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_ORDERING_CARD, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_ORDERING_CARD, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_ORDERING_CARD}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_ORDERING_CARD}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_ORDERING_CARD} LIMIT 10 OFFSET ${offset}`)
    }
}
