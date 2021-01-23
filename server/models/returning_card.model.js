const db = require('../utils/db');

const TBL_CATEGORY = 'category';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_CATEGORY}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_CATEGORY} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_CATEGORY, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_CATEGORY, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_CATEGORY, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_CATEGORY}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_CATEGORY}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_CATEGORY} LIMIT 10 OFFSET ${offset}`)
    }
}
