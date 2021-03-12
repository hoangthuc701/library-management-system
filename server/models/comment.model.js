const queries = require("../scripts/queries.script");
const db = require("../utils/db");

module.exports = {
  load5Comments: function (id, offset) {
    return db.load(queries.load5Comments(id, offset));
  },

  getCommentsQuantity: function (id) {
    return db.load(queries.getCommentsQuantity(id));
  },

  addComment: function (entity) {
    return db.add('comment',entity);
  }
};
