const moment = require('moment');

module.exports = {
    getCurrentDateTime: ()=>{
        return new moment().format('YYYY-MM-DD hh:mm:ss');
    },
    formatDateTimeSQL: function (value) {
        const sqlDate = new Date(value);
    
        return moment(sqlDate).format("YYYY-MM-DD hh:mm:ss");
    }
}