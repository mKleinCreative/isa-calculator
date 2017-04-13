const moment = require('moment')
const schoolDayCalculator = require('./schoolDayCalculator')

const {
  session1MaxFundingAmount,
  session2MaxFundingAmount,
  session3MaxFundingAmount,
  session4MaxFundingAmount,
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

module.exports = function(spec){
  let {
    programStartDate,
    earlyExitDate,
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
  } = spec

  let
    currentSession,
    session1FundingAmount,
    session2FundingAmount,
    session3FundingAmount,
    session4FundingAmount,
    payItForwardFundPaymentTerm,
    payItForwardFundTotalFundingAmount,
    rebate

  if ( earlyExitDate === session4EndDate) return {
    session1FundingAmount:          session1MaxFundingAmount,
    session2FundingAmount:          session2MaxFundingAmount,
    session3FundingAmount:          session3MaxFundingAmount,
    session4FundingAmount:          session4MaxFundingAmount,
    recievedPayItForwardFundRebate: true,
    payItForwardFundPaymentTerm:    36,
    payItForwardFundTotalFundingAmount: (
      session1MaxFundingAmount +
      session2MaxFundingAmount
    ),
  }

  const firstSession = daysAttended => {
    const percentageComplete = numberOfDaysInSession1 / daysAttended
    let percentageOwed = 0

    if( percentageComplete <= 0.5 ) {
      percentageOwed = 0
    } else if( percentageComplete < 0.6 ) {
      percentageOwed = session1MaxFundingAmount / percentageComplete
    } else if( percentageComplete >= 0.6 ){
      percentageOwed = session1MaxFundingAmount
    } return percentageOwed
  }

  const secondSession = daysAttended => {
    const percentageComplete = numberOfDaysInSession2 / daysAttended
    let percentageOwed = 0

    if( percentageComplete < 0.6 ) {
      percentageOwed = session2MaxFundingAmount / percentageComplete
    } else if( percentageComplete >= 0.6 ){
      percentageOwed = session2MaxFundingAmount
    } return percentageOwed
  }

  const thirdSession = daysAttended => {
    const percentageComplete = Math.round((daysAttended / numberOfDaysInSession3) * 100) / 100
    console.log('percentageComplete =', daysAttended,' / ',numberOfDaysInSession3, ' === ', percentageComplete)
    console.log('session3MaxFundingAmount * percentageComplete', session3MaxFundingAmount, ' * ', percentageComplete, ' === ', (session3MaxFundingAmount * percentageComplete))
    return percentageComplete <= 0.6
      ? session3MaxFundingAmount * percentageComplete
      : session3MaxFundingAmount
  }

  const fourthSession = daysAttended => {
    const percentageComplete =  daysAttended / numberOfDaysInSession4
    let percentageOwed = 0
    if( percentageComplete < 0.6 ) {
      percentageOwed = session4MaxFundingAmount / percentageComplete
    } else if( percentageComplete >= 0.6 ){
      percentageOwed = session4MaxFundingAmount
    } return percentageOwed
  }

  // const calculatePaymentTerm = (currentSession, currentSessionStart, earlyExitDate) => {
  //   const
  // }

  const calculateFundingAmountOwed = (currentSession, currentSessionStart, earlyExitDate) => {
    console.log('calculateFundingAmountOwed', {currentSession, currentSessionStart, earlyExitDate})
    let daysAttended = schoolDayCalculator(currentSessionStart, earlyExitDate)
    let percentageOwed = undefined

    return {
      '1': firstSession,
      '2': secondSession,
      '3': thirdSession,
      '4': fourthSession
    }[ currentSession ]( daysAttended )
  }

  if (moment(earlyExitDate).isBetween(session1StartDate, session1EndDate)){
    currentSession = 1
    session1FundingAmount = calculateFundingAmountOwed(currentSession, session1StartDate, earlyExitDate)
    session2FundingAmount = 0
    session3FundingAmount = 0
    session4FundingAmount = session4MaxFundingAmount
    recievedPayItForwardFundRebate = false
    // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
    payItForwardFundTotalFundingAmount = session1FundingAmount
  }

  else if (moment(earlyExitDate).isBetween(session2StartDate, session2EndDate)) {
    currentSession = 2
    session1FundingAmount = session1MaxFundingAmount
    session2FundingAmount = calculateFundingAmountOwed(currentSession, session2StartDate, earlyExitDate)
    session3FundingAmount = 0
    session4FundingAmount = session4MaxFundingAmount
    recievedPayItForwardFundRebate = false
    // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
    payItForwardFundTotalFundingAmount = session1MaxFundingAmount + session2FundingAmount
  }

  else if (moment(earlyExitDate).isBetween(session3StartDate, session3EndDate)) {
    currentSession = 3
    session1FundingAmount = session1MaxFundingAmount
    session2FundingAmount = session2MaxFundingAmount
    session3FundingAmount = calculateFundingAmountOwed(
      currentSession,
      session3StartDate,
      earlyExitDate
    )
    session4FundingAmount = session4MaxFundingAmount
    recievedPayItForwardFundRebate = false
    // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
    payItForwardFundTotalFundingAmount = (
      session1MaxFundingAmount +
      session2MaxFundingAmount +
      session3FundingAmount
    )
    console.log('session3FundingAmount:', session3FundingAmount)
  }

  else if (moment(earlyExitDate).isBetween(session4StartDate, session4EndDate)){
    currentSession = 4
    session1FundingAmount = session1MaxFundingAmount
    session2FundingAmount = session2MaxFundingAmount
    session3FundingAmount = session3MaxFundingAmount
    session4FundingAmount = session4MaxFundingAmount
    recievedPayItForwardFundRebate = false
    payItForwardFundPaymentTerm = 42
    payItForwardFundTotalFundingAmount = (session1MaxFundingAmount + session2MaxFundingAmount + session3MaxFundingAmount + session4MaxFundingAmount)

  }

  return {
    session1FundingAmount,
    session2FundingAmount,
    session3FundingAmount,
    session4FundingAmount,
    recievedPayItForwardFundRebate,
    payItForwardFundPaymentTerm,
    payItForwardFundTotalFundingAmount,
  }
}
