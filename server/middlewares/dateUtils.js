const moment = require('moment');

module.exports = {
    getCurrentDateTime: ()=>{
        return new moment();
    },
    formatDateTime: function (value) {
        const sqlDate = new Date(value);
    
        return moment(sqlDate).format("Y-MM-DD\Thh:mm:ss.ms");
    }
}