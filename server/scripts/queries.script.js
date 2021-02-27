module.exports = {
    // COMMENTS
    load5CommentsOffset: function (id, offset) {
        return `
        select c.comment, c.Created, ac.username
        from comment c join account ac on ac.id = c.AccountID
        where c.BookID = ${id}
        order by UNIX_TIMESTAMP(c.Created) desc
        limit 5
        offset ${offset}`;
    },

    getCommentsQuantity: function (id) {
        return `
        select count(c.id) as SoLuong
        from comment c
        where c.BookID = ${id}`;
    },

    //BOOK
    load5DependCategory: function (id, catID) {
        return `
        select b.id, b.name, b.description, b.created_at, b.image, c.id as CatID, c.name as catname, b.author
        from book_title b join category c on c.id = b.category_id
        where b.category_id = c.id and b.id <> ${id} and c.id = ${catID}
        order by UNIX_TIMESTAMP(b.created_at) desc
        limit 5`;
    }
}