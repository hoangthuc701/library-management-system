const Account = require('../models/account.model');
module.exports = {
    isUniqueUsername: async (req, res) => {
        var list = await Account.loadUser('test');
        if (list.length != 0) {
            return res.json(list);
        }
        
    }
}