const moment = require('moment')

const ISACalculator = function(spec){
  if (typeof spec !== 'object') return false

  // Date
  const startDate = spec.startDate
  if (!isDate(startDate))
    throw new Error('startDate must be a Date')

  // Integer
  // USA cents
  const stipendAmount = spec.stipendAmount
  if (!isInteger(stipendAmount))
    throw new Error('stipendAmount must be an integer')

  // Boolean
  const takingTheLaptopStipend = spec.takingTheLaptopStipend
  if (!isBoolean(takingTheLaptopStipend))
    throw new Error('takingTheLaptopStipend must be a boolean')

  // Integer
  // USA Cents
  // > $50K
  const expectedAnnualSalary = spec.expectedAnnualSalary
  if (!isInteger(expectedAnnualSalary))
    throw new Error('expectedAnnualSalary must be an integer')
  if (expectedAnnualSalary < 50000)
    throw new Error('expectedAnnualSalary must be greater than $50,000')


  // Date
  const earlyExitDate = spec.earlyExitDate
  if (!isDate(earlyExitDate))
    throw new Error('earlyExitDate must be a Date')
  if (earlyExitDate <= startDate)
    throw new Error('earlyExitDate must after startDate')


  // Date
  // the Friday of the 40th week (minus week long breaks)
  const endDate = calculateEndDate({
    startDate,
  })

  // Date
  // 35 days after start date (rounded forward to Monday)
  const cancellationDate = calculateCancellationDate({
    startDate,
  })

  //
  // const expectedISAProgramFeeMonthlyPayment

  //
  // const expectedISAStipenedMonthlyPayment

  //
  // const earlyExitISAProgramFeeMonthlyPayment

  //
  // const earlyExitISAStipenedMonthlyPayment

  //
  // const programFeePaymentTerm

  //
  // const totalFindingAmount

  return {
    startDate,
    stipendAmount,
    takingTheLaptopStipend,
    expectedAnnualSalary,
    earlyExitDate,
    endDate,
    cancellationDate,
  }
}

const isDate = function(date){
  return date instanceof Date
}

const isInteger = function(integer){
  return typeof integer === 'number' &&
    !integer.toString().includes('.')
}

const isBoolean = function(boolean) {
  return typeof boolean === 'boolean'
}

const calculateEndDate = function(spec){
  return moment(spec.startDate).add(41, 'weeks').toDate()
}


const calculateCancellationDate = function(spec){
  return moment(spec.startDate).add(35, 'days').toDate()
}


module.exports = ISACalculator
