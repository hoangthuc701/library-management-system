const db = require('../utils/db');

const TBL_ACCOUNT = 'account';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_ACCOUNT}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_ACCOUNT} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_ACCOUNT, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_ACCOUNT, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_ACCOUNT, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_ACCOUNT}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_ACCOUNT}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_ACCOUNT} LIMIT 10 OFFSET ${offset}`)
    }
}
