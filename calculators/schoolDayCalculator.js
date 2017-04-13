const moment = require('moment')
const { dateToString } = require('../utils')
const { breaks, holidays } = require('../data')

module.exports = function(from, to){
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
