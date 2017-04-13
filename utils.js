const moment = require('moment')

module.exports = {
  dateToString(date){
    return moment(date).format('YYYY-MM-DD')
  }
}
