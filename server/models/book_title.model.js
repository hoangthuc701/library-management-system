const db = require('../utils/db');

const TBL_TITLE = 'book_title';
const TBL_BOOK = 'book';
const queries = require('../scripts/queries.script');
module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_TITLE}`);
    },
    loadByID: function (id) {
        return db.load(`select b.*, c.name as catname from ${TBL_TITLE} b, category c where b.id = ${id} and b.category_id = c.id`);
    },
    loadName: function (name) {
        return db.load(`select * from ${TBL_TITLE} where name = '${name}'`)
    },
    loadByCategoryID: function (id, offset) {
        return db.load(`select * from ${TBL_TITLE} where category_id = ${id} LIMIT 2 OFFSET ${offset}`)
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
    loadGonnaOutOfStockBook: function(){
        return db.load(`select bt.*, c.name as catname FROM book_title bt, category c where bt.quantity > 0 and c.id = bt.category_id order by quantity asc limit 6`);
    },
    loadMostView: function(){
        return db.load(`select bt.*, c.name as catname FROM book_title bt, category c where bt.quantity > 0 and c.id = bt.category_id order by view desc limit 6`);
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
    quantityCategory: (id) =>{
        return db.load(`select count(*) as quantity from ${TBL_TITLE} where category_id = ${id}`);
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_TITLE} order by UNIX_TIMESTAMP(created_at) DESC LIMIT 10 OFFSET ${offset}`)
    },
    fulltextsearch: (keyword, offset) =>{
        return db.load(`select b.* from book_title b where match(b.name, b.author) against ('${keyword}') limit 10 offset ${offset}`)
    },
    searchDate: (date, todate, offset) =>{
        return db.load(`select * from book_title where created_at BETWEEN '${date}' and '${todate}' order by created_at DESC limit 10 offset ${offset}`)
    },
    load5DependCategory: function (id, catID) {
        return db.load(queries.load5DependCategory(id, catID));
    },
}
