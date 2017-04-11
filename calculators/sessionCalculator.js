const moment = require('moment')
const {
  startDates,
  breaks,
  holidays,
} = require('../data')

module.exports = function(session1StartDate){
  session1StartDate = moment(session1StartDate)

  const session1EndDate   = calculateSessionEndDate(session1StartDate)
  const session2StartDate = toNextMonday(session1EndDate)
  const session2EndDate   = calculateSessionEndDate(session2StartDate)
  const session3StartDate = toNextMonday(session2EndDate)
  const session3EndDate   = calculateSessionEndDate(session3StartDate)
  const session4StartDate = toNextMonday(session3EndDate)
  const session4EndDate   = calculateSessionEndDate(session4StartDate)

  const numberOfDaysInSession1 = calculateNumberOfDaysInSession(
    session1StartDate,
    session1EndDate
  )
  const numberOfDaysInSession2 = calculateNumberOfDaysInSession(
    session2StartDate,
    session2EndDate
  )
  const numberOfDaysInSession3 = calculateNumberOfDaysInSession(
    session3StartDate,
    session3EndDate
  )
  const numberOfDaysInSession4 = calculateNumberOfDaysInSession(
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

const dateToString = function(date){
  return moment(date).format('YYYY-MM-DD')
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
      endDate = endDate.add(1, 'week')
    }
  })
  // DO NOT account for holidays here
  // All start dates on Monday
  // All end dates on Friday
  // holidays are accounted for in calculateNumberOfDaysInSession
  return endDate
}

const calculateNumberOfDaysInSession = function(from, to){
  let numberOfDays = moment(to).diff(from, 'days')

  const allDays = generateObjectOfDates(from, numberOfDays)

  Object.keys(allDays).forEach(function(day){
    if (isWeekend(day)) allDays[day] = false
  })

  breaks.forEach(function(weekBreak){
    const monday    = dateToString(moment(weekBreak))
    const tuesday   = dateToString(moment(weekBreak).add(1, 'day'))
    const wednesday = dateToString(moment(weekBreak).add(2, 'days'))
    const thursday  = dateToString(moment(weekBreak).add(3, 'days'))
    const friday    = dateToString(moment(weekBreak).add(4, 'days'))

    if (monday    in allDays) allDays[monday]    = false
    if (tuesday   in allDays) allDays[tuesday]   = false
    if (wednesday in allDays) allDays[wednesday] = false
    if (thursday  in allDays) allDays[thursday]  = false
    if (friday    in allDays) allDays[friday]    = false
  })

  holidays.forEach(function(holiday){
    const date = dateToString(getHolidayObservationDate(holiday))
    if (date in allDays) allDays[date] = false
  })

  return Object.keys(allDays).filter(day => allDays[day]).length
}

const getHolidayObservationDate = function(holiday){
  const day = moment(holiday).format('dddd')
  if (day === 'Sunday') return moment(holiday).add(1, 'day')
  if (day === 'Saturday') return moment(holiday).subtract(1, 'day')
  return moment(holiday)
}


const generateObjectOfDates = function(from, numberOfDays){
  const allDays = {}
  for (var i = 0; i <= numberOfDays; i++) {
    const date = moment(from)
      .clone()
      .add(i, 'days')
    allDays[dateToString(date)] = true
  }
  return allDays
}

const isWeekend = function(date){
  const dayOfTheWeek = moment(date).format('dddd')
  return dayOfTheWeek === 'Saturday' || dayOfTheWeek === 'Sunday'
}
