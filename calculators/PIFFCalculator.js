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

  if (!earlyExitDate) return {
    session1FundingAmount:          session1MaxFundingAmount,
    session2FundingAmount:          session2MaxFundingAmount,
    session3FundingAmount:          session3MaxFundingAmount,
    session4FundingAmount:          session4MaxFundingAmount,
    recievedPayItForwardFundRebate: true,
    payItForwardFundPaymentTerm:    36,
    payItForwardFundTotalFundingAmount: (
      session1MaxFundingAmount +
      session2MaxFundingAmount +
      session3MaxFundingAmount +
      session4MaxFundingAmount +
      completeProgramFundingAmountRebate
    ),
  }



  const sessions = [
    {
      startDate: session1StartDate,
      endDate: session1EndDate,
      numberOfSchoolDays: numberOfDaysInSession1,
      maxFundingAmount: session1MaxFundingAmount,
      maxPaymentTerm: session1PaymentTermLength,
    },
    {
      startDate: session2StartDate,
      endDate: session2EndDate,
      numberOfSchoolDays: numberOfDaysInSession2,
      maxFundingAmount: session2MaxFundingAmount,
      maxPaymentTerm: session2PaymentTermLength,
    },
    {
      startDate: session3StartDate,
      endDate: session3EndDate,
      numberOfSchoolDays: numberOfDaysInSession3,
      maxFundingAmount: session3MaxFundingAmount,
      maxPaymentTerm: session3PaymentTermLength,
    },
    {
      startDate: session4StartDate,
      endDate: session4EndDate,
      numberOfSchoolDays: numberOfDaysInSession4,
      maxFundingAmount: session4MaxFundingAmount,
      maxPaymentTerm: session4PaymentTermLength,
    },
  ]

  const exitSession = sessions.findIndex(function(session, index){
    return moment(earlyExitDate).isBetween(session.startDate, session.endDate)
  }) + 1

  if (!exitSession) throw new Error('invalid earlyExitDate')

  sessions.forEach(function(session, index){
    const sessionNumber = index + 1;
    session.numberOfSchoolDaysAttended =
      sessionNumber < exitSession   ? session.numberOfSchoolDays :
      sessionNumber === exitSession ? schoolDayCalculator(session.startDate, earlyExitDate) :
      0
    session.percentageComplete = session.numberOfSchoolDaysAttended / session.numberOfSchoolDays
    session.fundingAmount = session.maxFundingAmount * session.percentageComplete
    session.paymentTerm = session.maxPaymentTerm * session.percentageComplete
  })


  // console.log('sessions', sessions)

  const session1FundingAmount = sessions[0].fundingAmount
  const session2FundingAmount = sessions[1].fundingAmount
  const session3FundingAmount = sessions[2].fundingAmount
  const session4FundingAmount = sessions[3].fundingAmount
  const payItForwardFundTotalFundingAmount = (
    session1FundingAmount +
    session2FundingAmount +
    session3FundingAmount +
    session4FundingAmount
  )

  const payItForwardFundPaymentTerm = (
    sessions[0].paymentTerm +
    sessions[1].paymentTerm +
    sessions[2].paymentTerm +
    sessions[3].paymentTerm
  )

  return {
    session1FundingAmount,
    session2FundingAmount,
    session3FundingAmount,
    session4FundingAmount,
    recievedPayItForwardFundRebate: false,
    payItForwardFundTotalFundingAmount,
    payItForwardFundPaymentTerm,
  }


  // ---- old 1

  //
  //
  //
  //
  // const exitSession = (
  //   moment(earlyExitDate).isBetween(session1StartDate, session1EndDate) ? 1 :
  //   moment(earlyExitDate).isBetween(session2StartDate, session2EndDate) ? 2 :
  //   moment(earlyExitDate).isBetween(session3StartDate, session3EndDate) ? 3 :
  //   moment(earlyExitDate).isBetween(session4StartDate, session4EndDate) ? 4 :
  //   false
  // )
  // if (![1,2,3,4].includes(exitSession)) throw new Error('invalid earlyExitDate')
  //
  // const exitSessionStartDate = {
  //   1: session1StartDate,
  //   2: session2StartDate,
  //   3: session3StartDate,
  //   4: session4StartDate,
  // }[exitSession]
  //
  // const numberOfDaysInExitSession = {
  //   1: numberOfDaysInSession1,
  //   2: numberOfDaysInSession2,
  //   3: numberOfDaysInSession3,
  //   4: numberOfDaysInSession4,
  // }[exitSession]
  //
  // const exitSessionDaysAttended = schoolDayCalculator(exitSessionStartDate, earlyExitDate)
  //
  // const exitSessionPercentage = exitSessionDaysAttended / numberOfDaysInExitSession
  //
  //
  // const session1FundingAmount = exitSession === 1
  //   ?
  //   : session1MaxFundingAmount
  // const session2FundingAmount = exitSession === 2
  //   ?
  //   : session2MaxFundingAmount
  // const session3FundingAmount = exitSession === 3
  //   ?
  //   : session3MaxFundingAmount
  // const session4FundingAmount = exitSession === 4
  //   ?
  //   : session4MaxFundingAmount
  //
  // return {
  //   exitSession,
  //   exitSessionDaysAttended,
  //   exitSessionPercentage,
  //   session1FundingAmount,
  //   session2FundingAmount,
  //   session3FundingAmount,
  //   session4FundingAmount,
  // }













  // ---- old 2

  //
  // const firstSession = daysAttended => {
  //   const percentageComplete = numberOfDaysInSession1 / daysAttended
  //   let percentageOwed = 0
  //
  //   if( percentageComplete <= 0.5 ) {
  //     percentageOwed = 0
  //   } else if( percentageComplete < 0.6 ) {
  //     percentageOwed = session1MaxFundingAmount / percentageComplete
  //   } else if( percentageComplete >= 0.6 ){
  //     percentageOwed = session1MaxFundingAmount
  //   } return percentageOwed
  // }
  //
  // const secondSession = daysAttended => {
  //   const percentageComplete = numberOfDaysInSession2 / daysAttended
  //   let percentageOwed = 0
  //
  //   if( percentageComplete < 0.6 ) {
  //     percentageOwed = session2MaxFundingAmount / percentageComplete
  //   } else if( percentageComplete >= 0.6 ){
  //     percentageOwed = session2MaxFundingAmount
  //   } return percentageOwed
  // }
  //
  // const thirdSession = daysAttended => {
  //   // const percentageComplete = Math.round((daysAttended / numberOfDaysInSession3) * 100) / 100
  //   // const percentageComplete = Math.round((daysAttended / numberOfDaysInSession3) * 1000) / 1000
  //   const percentageComplete = daysAttended / numberOfDaysInSession3
  //   console.log('percentageComplete =', daysAttended,' / ',numberOfDaysInSession3, ' === ', percentageComplete)
  //   console.log('session3MaxFundingAmount * percentageComplete', session3MaxFundingAmount, ' * ', percentageComplete, ' === ', (session3MaxFundingAmount * percentageComplete))
  //   return percentageComplete <= 0.6
  //     ? session3MaxFundingAmount * percentageComplete
  //     : session3MaxFundingAmount
  // }
  //
  // const fourthSession = daysAttended => {
  //   const percentageComplete = daysAttended / numberOfDaysInSession4
  //   let percentageOwed = 0
  //   if( percentageComplete < 0.6 ) {
  //     percentageOwed = session4MaxFundingAmount / percentageComplete
  //   } else if( percentageComplete >= 0.6 ){
  //     percentageOwed = session4MaxFundingAmount
  //   } return percentageOwed
  // }
  //
  // // const calculatePaymentTerm = (currentSession, currentSessionStart, earlyExitDate) => {
  // //   const
  // // }
  //
  // const calculateFundingAmountOwed = (currentSession, currentSessionStart, earlyExitDate) => {
  //   console.log('calculateFundingAmountOwed', {currentSession, currentSessionStart, earlyExitDate})
  //   let daysAttended = schoolDayCalculator(currentSessionStart, earlyExitDate)
  //   let percentageOwed = undefined
  //
  //   return {
  //     '1': firstSession,
  //     '2': secondSession,
  //     '3': thirdSession,
  //     '4': fourthSession
  //   }[ currentSession ]( daysAttended )
  // }
  //
  // if (moment(earlyExitDate).isBetween(session1StartDate, session1EndDate)){
  //   currentSession = 1
  //   session1FundingAmount = calculateFundingAmountOwed(currentSession, session1StartDate, earlyExitDate)
  //   session2FundingAmount = 0
  //   session3FundingAmount = 0
  //   session4FundingAmount = session4MaxFundingAmount
  //   recievedPayItForwardFundRebate = false
  //   // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
  //   payItForwardFundTotalFundingAmount = session1FundingAmount
  // }
  //
  // else if (moment(earlyExitDate).isBetween(session2StartDate, session2EndDate)) {
  //   currentSession = 2
  //   session1FundingAmount = session1MaxFundingAmount
  //   session2FundingAmount = calculateFundingAmountOwed(currentSession, session2StartDate, earlyExitDate)
  //   session3FundingAmount = 0
  //   session4FundingAmount = session4MaxFundingAmount
  //   recievedPayItForwardFundRebate = false
  //   // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
  //   payItForwardFundTotalFundingAmount = session1MaxFundingAmount + session2FundingAmount
  // }
  //
  // else if (moment(earlyExitDate).isBetween(session3StartDate, session3EndDate)) {
  //   currentSession = 3
  //   session1FundingAmount = session1MaxFundingAmount
  //   session2FundingAmount = session2MaxFundingAmount
  //   session3FundingAmount = calculateFundingAmountOwed(
  //     currentSession,
  //     session3StartDate,
  //     earlyExitDate
  //   )
  //   session4FundingAmount = session4MaxFundingAmount
  //   recievedPayItForwardFundRebate = false
  //   // payItForwardFundPaymentTerm = calculatePaymentTerm(currentSession, session1StartDate, earlyExitDate)
  //   payItForwardFundTotalFundingAmount = (
  //     session1MaxFundingAmount +
  //     session2MaxFundingAmount +
  //     session3FundingAmount
  //   )
  //   console.log('payItForwardFundTotalFundingAmount = ',
  //     session1MaxFundingAmount, ' + ',
  //     session2MaxFundingAmount, ' + ',
  //     session3FundingAmount, ' === ',
  //     payItForwardFundTotalFundingAmount
  //   )
  //   console.log('session3FundingAmount:', session3FundingAmount)
  // }
  //
  // else if (moment(earlyExitDate).isBetween(session4StartDate, session4EndDate)){
  //   currentSession = 4
  //   session1FundingAmount = session1MaxFundingAmount
  //   session2FundingAmount = session2MaxFundingAmount
  //   session3FundingAmount = session3MaxFundingAmount
  //   session4FundingAmount = session4MaxFundingAmount
  //   recievedPayItForwardFundRebate = false
  //   payItForwardFundPaymentTerm = 42
  //   payItForwardFundTotalFundingAmount = (session1MaxFundingAmount + session2MaxFundingAmount + session3MaxFundingAmount + session4MaxFundingAmount)
  //
  // }
  //
  // return {
  //   session1FundingAmount,
  //   session2FundingAmount,
  //   session3FundingAmount,
  //   session4FundingAmount,
  //   recievedPayItForwardFundRebate,
  //   payItForwardFundPaymentTerm,
  //   payItForwardFundTotalFundingAmount,
  // }
}
