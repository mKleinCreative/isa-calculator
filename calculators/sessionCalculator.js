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

  console.log('-=-=-=-=- Session1')
  const numberOfDaysInSession1 = calculateNumberOfDaysInSession(
    session1StartDate,
    session1EndDate
  )
  console.log('-=-=-=-=- Session2')
  const numberOfDaysInSession2 = calculateNumberOfDaysInSession(
    session2StartDate,
    session2EndDate
  )
  console.log('-=-=-=-=- Session3')
  const numberOfDaysInSession3 = calculateNumberOfDaysInSession(
    session3StartDate,
    session3EndDate
  )
  console.log('-=-=-=-=- Session4')
  const numberOfDaysInSession4 = calculateNumberOfDaysInSession(
    session4StartDate,
    session4EndDate
  )
  return {
    // cancellationDate,
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
  return moment(date)
    .clone()
    .endOf('week')
    .add(2, 'days')
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
  console.log('from', from.format('dddd YYYY-MM-DD'))
  console.log('to  ', to.format('dddd YYYY-MM-DD'))

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

    if (monday    in allDays) {
      console.log('accounting for', monday, 'within week break', weekBreak)
      allDays[monday] = false
    }
    if (tuesday   in allDays) {
      console.log('accounting for', tuesday, 'within week break', weekBreak)
      allDays[tuesday] = false
    }
    if (wednesday in allDays) {
      console.log('accounting for', wednesday, 'within week break', weekBreak)
      allDays[wednesday] = false
    }
    if (thursday  in allDays) {
      console.log('accounting for', thursday, 'within week break', weekBreak)
      allDays[thursday] = false
    }
    if (friday    in allDays) {
      console.log('accounting for', friday, 'within week break', weekBreak)
      allDays[friday] = false
    }
  })

  holidays.forEach(function(holiday){
    const date = dateToString(getHolidayObservationDate(holiday))
    if (date in allDays) allDays[date] = false
  })

  console.log('allDays', allDays)
  return Object.keys(allDays).filter(day => allDays[day]).length
}

const getHolidayObservationDate = function(holiday){
  const day = moment(holiday).format('dddd')
  if (day === 'Sunday') {
    console.log('holiday observed 1 day after', holiday, moment(holiday).add(1, 'day'))
    return moment(holiday).add(1, 'day')
  }
    if (day === 'Saturday') {
    console.log('holiday observed 1 day before', holiday, moment(holiday).subtract(1, 'day'))
    return moment(holiday).subtract(1, 'day')
  }
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
