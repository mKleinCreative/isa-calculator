const moment = require('moment')

const ISACalculator = function(conf){

  // Date
  const startDate = conf.startDate

  // Integer
  // USA cents
  const stipendAmount = conf.stipendAmount

  // Boolean
  const takingTheLaptopStipend = conf.takingTheLaptopStipend

  // Integer
  // USA Cents
  // > $50K
  const expectedAnnualSalary = conf.expectedAnnualSalary

  //
  const earlyExitDate = conf.earlyExitDate



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
  const expectedISAProgramFeeMonthlyPayment

  //
  const expectedISAStipenedMonthlyPayment

  //
  const earlyExitISAProgramFeeMonthlyPayment

  //
  const earlyExitISAStipenedMonthlyPayment

  //
  const programFeePaymentTerm

  //
  const totalFindingAmount

}


const calculateEndDate = function(conf){
  return moment(conf.startDate).add(41, 'weeks').toDate()
}


const calculateCancellationDate = function(conf){
  return moment(conf.startDate).add(35, 'days').toDate()
}


module.exports = ISACalculator
