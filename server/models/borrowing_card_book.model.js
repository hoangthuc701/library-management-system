const db = require('../utils/db');

const TBL_BORROWING_CARD_BOOK = 'borrowing_card_book';

module.exports = {
    load: function () {
        return db.load(`select * from ${TBL_BORROWING_CARD_BOOK}`);
    },
    loadByID: function (id) {
        return db.load(`select * from ${TBL_BORROWING_CARD_BOOK} where id = ${id}`);
    },
    loadByBorrowingCardID: function (id) {
        return db.load(`select bc.*, b.name from ${TBL_BORROWING_CARD_BOOK} bc, book_title b where bc.book_id = b.id and borrowing_card_id = '${id}'`);
    },
    loadByBookID: function (id) {
        return db.load(`select * from ${TBL_BORROWING_CARD_BOOK} where book_id = ${id}`);
    },
    insert: function (entity) {
        return db.add(TBL_BORROWING_CARD_BOOK, entity);
    },
    update: function (entity) {
        const condition = {
            id: entity.id
        }
        delete entity.id;
        return db.patch(TBL_BORROWING_CARD_BOOK, entity, condition);
    },
    delete: function (id) {
        const condition = { id }
        return db.del(TBL_BORROWING_CARD_BOOK, condition);
    },

    getNextAutoIncrement: () => {
        return db.load(`SELECT AUTO_INCREMENT
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = "${databaseName}"
        AND TABLE_NAME = "${TBL_BORROWING_CARD_BOOK}"`)
    },
    quantity: () =>{
        return db.load(`select count(*) as quantity from ${TBL_BORROWING_CARD_BOOK}`)
    },
    loadByOffset: (offset) =>{
        return db.load(`SELECT * FROM ${TBL_BORROWING_CARD_BOOK} LIMIT 10 OFFSET ${offset}`)
    }
}

