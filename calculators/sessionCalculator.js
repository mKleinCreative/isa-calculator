const moment = require('moment')
const { breaks } = require('../data')

const { dateToString } = require('../utils')


const schoolDayCalculator = require('./schoolDayCalculator')

module.exports = function(session1StartDate){
  session1StartDate = moment(session1StartDate)

  const session1EndDate   = calculateSessionEndDate(session1StartDate)
  const session2StartDate = toNextMonday(session1EndDate)
  const session2EndDate   = calculateSessionEndDate(session2StartDate)
  const session3StartDate = toNextMonday(session2EndDate)
  const session3EndDate   = calculateSessionEndDate(session3StartDate)
  const session4StartDate = toNextMonday(session3EndDate)
  const session4EndDate   = calculateSessionEndDate(session4StartDate)

  const numberOfDaysInSession1 = schoolDayCalculator(
    session1StartDate,
    session1EndDate
  )
  const numberOfDaysInSession2 = schoolDayCalculator(
    session2StartDate,
    session2EndDate
  )
  const numberOfDaysInSession3 = schoolDayCalculator(
    session3StartDate,
    session3EndDate
  )
  const numberOfDaysInSession4 = schoolDayCalculator(
    session4StartDate,
    session4EndDate
  )

  const cancellationDate = toNextMonday(session1StartDate.clone().add(35, 'days'))

  return {
    cancellationDate:  dateToString(cancellationDate),
    session1StartDate: dateToString(session1StartDate),
    session1EndDate:   dateToString(session1EndDate),
    session2StartDate: dateToString(session2StartDate),
    session2EndDate:   dateToString(session2EndDate),
    session3StartDate: dateToString(session3StartDate),
    session3EndDate:   dateToString(session3EndDate),
    session4StartDate: dateToString(session4StartDate),
    session4EndDate:   dateToString(session4EndDate),

    // session4EndDate,
    numberOfDaysInSession1,
    numberOfDaysInSession2,
    numberOfDaysInSession3,
    numberOfDaysInSession4,
  }
}

const toNextMonday = function(date){
  if (moment(date).format('dddd') === 'Monday') return date
  return moment(date).endOf('week').add(2, 'days')
}

const calculateSessionEndDate = function(sessionStartDate){
  let endDate = moment(sessionStartDate)
    .clone()
    .add(67, 'days')
    .endOf('week')
    .subtract(1, 'day')

  breaks.forEach(function(weekBreak){
    if (moment(weekBreak).isBetween(sessionStartDate, endDate)){
      // console.log('session end date pushed 1 week because of break', weekBreak)
      endDate = endDate.add(1, 'week')
    }
  })
  // DO NOT account for holidays here
  // All start dates on Monday
  // All end dates on Friday
  // holidays are accounted for in schoolDayCalculator
  return endDate
}
