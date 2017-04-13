const moment = require('moment')

const {
  session1FundingAmount,
  session2FundingAmount,
  session3FundingAmount,
  session4FundingAmount,
  completeProgramFundingAmountRebate,
  session1PaymentTermLength,
  session2PaymentTermLength,
  session3PaymentTermLength,
  session4PaymentTermLength,
  completeProgramPaymentTermRebate,
  stipenedFeePaymentTerm,
  laptopStipened,
  payItForwardFundISAPercent,
  perfectCase,
} = require('../data')

const sessionCalculator = require('./sessionCalculator')

module.exports = function(spec){
  const {
    programStartDate,
    programTerminationDate,
  } = spec

  let {
    cancellationDate,
    session1StartDate,
    session1EndDate,
    session2StartDate,
    session2EndDate,
    session3StartDate,
    session3EndDate,
    session4StartDate,
    session4EndDate,
    numberOfDaysInSession1,
    numberOfDaysInSession2,
    numberOfDaysInSession3,
    numberOfDaysInSession4,
  } = sessionCalculator(programStartDate)

  let currentSession

  console.log('perfectCase:', perfectCase)
  console.log('programStartDate:', programStartDate)
  console.log('programTerminationDate:', programTerminationDate)
  // if you complete the program, return the optimal funding solution.
  if(programTerminationDate === session4EndDate) return perfectCase

  switch(programTerminationDate) {
    case programTerminationDate === session4EndDate:
      return perfectCase
      break;
    case programTerminationDate >= session1EndDate && programTerminationDate <= session1StartDate:
      currentSession = 1
      break;
    case programTerminationDate >= session2EndDate && programTerminationDate <= session2StartDate:
      currentSession = 2

      break;
    case programTerminationDate >= session3EndDate && programTerminationDate <= session3StartDate:
    currentSession = 3

      break;

      default: currentSession = 4

  } console.log('currentSession:', currentSession)
}


  // 'programFeeMonthlyPercentage':        12.5, // STATIC
  // 'laptopStipened':                     true,
  // 'session1FundingAmount':              1700000,
  // 'session2FundingAmount':              850000,
  // 'session3FundingAmount':              425000,
  // 'session4FundingAmount':              0,
  // 'rebate':                             true,
  // 'payItForwardFundPaymentTerm':        36,
  // 'payItForwardFundTotalFundingAmount': 2550000,
