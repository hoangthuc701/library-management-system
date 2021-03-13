const db = require('../utils/db');

const TBL_ROLE = 'role';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_ROLE}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_ROLE} where id = ${id}`);
    },
   
    insert: function (entity) {
        return db.add(TBL_ROLE, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_ROLE, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_ROLE, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_ROLE}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_ROLE}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_ROLE} LIMIT 10 OFFSET ${offset}`)
    }
}
