const moment = require('moment')

const ISACalculator = function(spec){
  if (typeof spec !== 'object') return false

  // Date
  const startDate = spec.startDate
  validateStartDate(startDate)

  // Integer
  // USA cents
  const stipendAmount = spec.stipendAmount
  validateStipendAmount(stipendAmount)

  // Boolean
  const takingTheLaptopStipend = spec.takingTheLaptopStipend
  validateTakingTheLaptopStipend(takingTheLaptopStipend)

  // Integer
  // USA Cents
  // > $50K
  const expectedAnnualSalary = spec.expectedAnnualSalary
  validateExpectedAnnualSalary(expectedAnnualSalary)

  // Date
  const earlyExitDate = spec.earlyExitDate
  validateEarlyExitDate(earlyExitDate, startDate)


  // Date
  // the Friday of the 40th week (minus week long breaks)
  const endDate = calculateEndDate(startDate)

  // Date
  // 35 days after start date (rounded forward to Monday)
  const cancellationDate = calculateCancellationDate(startDate)

  //
  const expectedISAProgramFeeMonthlyPayment = calculateExpectedISAProgramFeeMonthlyPayment()

  //
  const expectedISAStipenedMonthlyPayment = calculateExpectedISAStipenedMonthlyPayment()

  //
  const earlyExitISAProgramFeeMonthlyPayment = calculateEarlyExitISAProgramFeeMonthlyPayment()

  //
  const earlyExitISAStipenedMonthlyPayment = calculateEarlyExitISAStipenedMonthlyPayment()

  //
  const programFeePaymentTerm = calculateProgramFeePaymentTerm()

  //
  const totalFindingAmount = calculateTotalFindingAmount()

  return {
    startDate,
    stipendAmount,
    takingTheLaptopStipend,
    expectedAnnualSalary,
    earlyExitDate,
    endDate,
    cancellationDate,
    expectedISAProgramFeeMonthlyPayment,
    expectedISAStipenedMonthlyPayment,
    earlyExitISAProgramFeeMonthlyPayment,
    earlyExitISAStipenedMonthlyPayment,
    programFeePaymentTerm,
    totalFindingAmount,
  }
}

const isDate = function(date){
  return date instanceof Date ||
    /^\d\d\d\d-\d\d-\d\d$/.test(date)
}

const isInteger = function(integer){
  return typeof integer === 'number' &&
    !integer.toString().includes('.')
}

const isBoolean = function(boolean) {
  return typeof boolean === 'boolean'
}

const validateStartDate = function(startDate){
  if (!isDate(startDate))
    throw new Error('startDate must be a Date')
}

const validateStipendAmount = function(stipendAmount){
  if (!isInteger(stipendAmount))
    throw new Error('stipendAmount must be an integer')
}

const validateTakingTheLaptopStipend = function(takingTheLaptopStipend){
  if (!isBoolean(takingTheLaptopStipend))
    throw new Error('takingTheLaptopStipend must be a boolean')
}

const validateExpectedAnnualSalary = function(expectedAnnualSalary){
  if (typeof expectedAnnualSalary === 'undefined') return
  if (!isInteger(expectedAnnualSalary))
    throw new Error('expectedAnnualSalary must be an integer')
  if (expectedAnnualSalary < 50000)
    throw new Error('expectedAnnualSalary must be greater than $50,000')
}

const validateEarlyExitDate = function(earlyExitDate, startDate){
  if (earlyExitDate && !isDate(earlyExitDate))
    throw new Error('earlyExitDate must be a Date')
  if (earlyExitDate && earlyExitDate <= startDate)
    throw new Error('earlyExitDate must be after startDate')
}


const calculateEndDate = function(startDate){
  return moment(startDate).add(41, 'weeks').format('YYYY-MM-DD')
}

const calculateCancellationDate = function(startDate){
  return moment(startDate).add(35, 'days').format('YYYY-MM-DD')
}

const calculateExpectedISAProgramFeeMonthlyPayment = function(){

}

const calculateExpectedISAStipenedMonthlyPayment = function(){

}

const calculateEarlyExitISAProgramFeeMonthlyPayment = function(){

}

const calculateEarlyExitISAStipenedMonthlyPayment = function(){

}

const calculateProgramFeePaymentTerm = function(){

}

const calculateTotalFindingAmount = function(){

}

module.exports = ISACalculator
