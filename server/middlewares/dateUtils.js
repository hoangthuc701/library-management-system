const moment = require('moment');

module.exports = {
    getCurrentDateTime: ()=>{
        return new moment();
    },
    formatDateTimeSQL: function (value) {
        const sqlDate = new Date(value);
    
        return moment(sqlDate).format("YYYY-MM-DD hh:mm:ss");
    }
}