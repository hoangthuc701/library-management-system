const db = require('../utils/db');

const TBL_ACCOUNT = 'account';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_ACCOUNT}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_ACCOUNT} where id = ${id}`);
    },
    loadUser: function (username) {
        return db.load(`select * from ${TBL_ACCOUNT} where username = '${username}'`)
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
    awaiting: function(offset){
        return db.load(`select a.*, i.content_register from ${TBL_ACCOUNT} a, infor_register_reader i where a.id = i.account_id and a.role_id = 6 LIMIT 10 OFFSET ${offset}`);
    },
    quantityAwaiting: () =>{
        return db.load(`select count(*) as quantity from ${TBL_ACCOUNT} where role_id = 6`);
    },
    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_ACCOUNT}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_ACCOUNT}`);
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_ACCOUNT} LIMIT 10 OFFSET ${offset}`)
    },
    LoadInfor_register: (userID) =>{
        return db.load(`SELECT * FROM infor_register_reader where account_id = ${userID}`)
    },
    deleteInfor_register: function (id) {
        const condition = { id }
        return db.del('infor_register_reader', condition);
    },
    insertInforRegister: function (entity) {
        return db.add('infor_register_reader', entity);
    },
}
