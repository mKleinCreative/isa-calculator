const moment = require('moment')

const {
  breaks,
  holidays,
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
} = require('./data')

/*
Usage:

  ISACalculator({
    // String
    // formatted like YYYY-MM-DD
    // required
    startDate: '',

    // Integer
    // required
    stipendAmount: '',

    // Boolean
    // required
    takingTheLaptopStipend: true,

    // Ignored for now
    // optional
    expectedAnnualSalary: '',

    // Ignored for now
    // optional
    earlyExitDate: '',
  })

  // returns =>
  {
    ////// INPUTS ///////

    // startDate
    // the date the learner first entered the school
    startDate,

    // stipendAmount
    // the amount of stipened the learn chose to recieve
    // not including money for a laptop
    // Integer ($ as cents)
    // required
    stipendAmount,

    // takingTheLaptopStipend
    // If the learner took a laptop
    // part o the learner living fund
    // Boolean
    // required
    takingTheLaptopStipend,

    // IGNORED FOR NOW
    expectedAnnualSalary,
    // IGNORED FOR NOW
    earlyExitDate,



    ////// OUTPUTS ///////


    // session1StartDate
    // Date formated as 'YYYY-MM-DD'
    session1StartDate,

    // session1EndDate
    // Date formated as 'YYYY-MM-DD'
    session1EndDate,

    // session2StartDate
    // Date formated as 'YYYY-MM-DD'
    session2StartDate,

    // session2EndDate
    // Date formated as 'YYYY-MM-DD'
    session2EndDate,

    // session3StartDate
    // Date formated as 'YYYY-MM-DD'
    session3StartDate,

    // session3EndDate
    // Date formated as 'YYYY-MM-DD'
    session3EndDate,

    // session4StartDate
    // Date formated as 'YYYY-MM-DD'
    session4StartDate,

    // session4EndDate
    // Date formated as 'YYYY-MM-DD'
    session4EndDate,

    // numberOfDaysInSession1
    // the number of days you would attend school in session X
    // Integer
    numberOfDaysInSession1,

    // numberOfDaysInSession2
    // the number of days you would attend school in session X
    // Integer
    numberOfDaysInSession2,

    // numberOfDaysInSession3
    // the number of days you would attend school in session X
    // Integer
    numberOfDaysInSession3,

    // numberOfDaysInSession4
    // the number of days you would attend school in session X
    // Integer
    numberOfDaysInSession4,

    // session1percentageComplete
    // Date formated as 'YYYY-MM-DD'
    // IGNORED FOR NOW
    // ONLY RELEVANT TO LEARNERS WHO LEAVE EARLY
    session1percentageComplete,

    // session2percentageComplete
    // Date formated as 'YYYY-MM-DD'
    // IGNORED FOR NOW
    // ONLY RELEVANT TO LEARNERS WHO LEAVE EARLY
    session2percentageComplete,

    // session3percentageComplete
    // Date formated as 'YYYY-MM-DD'
    // IGNORED FOR NOW
    // ONLY RELEVANT TO LEARNERS WHO LEAVE EARLY
    session3percentageComplete,

    // session4percentageComplete
    // Date formated as 'YYYY-MM-DD'
    // IGNORED FOR NOW
    // ONLY RELEVANT TO LEARNERS WHO LEAVE EARLY
    session4percentageComplete,

    // endDate
    // the last day of school for a learner
    // Date formated as 'YYYY-MM-DD'
    endDate,

    // cancellationDate
    // the date the learner left early, if they did so
    // Date formated as 'YYYY-MM-DD' OR undefined
    cancellationDate,

    // payItForwardFundMonthlyPercentage
    // STATIC 12.5%
    payItForwardFundMonthlyPercentage,

    // payItForwardFundPaymentTerm
    // Integer of months
    // based on how long you were in the program
    payItForwardFundPaymentTerm,

    // payItForwardFundTotalFundingAmount
    // Integer of ($ as centers)
    // based on how long the learner was in the program
    // sum of the cost of each session
    // subject to the 60% rule
    payItForwardFundTotalFundingAmount,

    // payItForwardFundCapPaymentAmount
    // max you will ever pay back for the pay it forward fund
    // Integer of ($ as centers)
    payItForwardFundCapPaymentAmount,

    // recievedPayItForwardFundRebate
    // boolean
    // true if they stayed the entire time
    recievedPayItForwardFundRebate,

    // learnerLivingFundMonthlyPercentage
    // based on how much of the `totalLearnerLivingFund` the learner recieved
    // float percentage
    learnerLivingFundMonthlyPercentage,

    // learnerLivingFundPaymentTerm
    // 36 months STATIC
    // Integer of months
    learnerLivingFundPaymentTerm,

    // learnerLivingFundMaxAmount
    // the total amount of money, including the laptop, that the learner could
    //   recieve if they stay for the whole program
    // Integer of ($ as cents)
    learnerLivingFundMaxAmount,

    // learnerLivingFundRecievedAmount
    // Integer of ($ as cents)
    learnerLivingFundRecievedAmount,

  }



*/
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

  const {
    session1EndDate,
    session2EndDate,
    session3EndDate,
    session4EndDate,
    numberOfDaysInSession1,
    numberOfDaysInSession2,
    numberOfDaysInSession3,
    numberOfDaysInSession4,
  } = calculateSessions(startDate)

  const session1percentageComplete = calculateSession1percentageComplete(earlyExitDate)
  const session2percentageComplete = calculateSession2percentageComplete(earlyExitDate)
  const session3percentageComplete = calculateSession3percentageComplete(earlyExitDate)
  const session4percentageComplete = calculateSession4percentageComplete(earlyExitDate)

  // Date
  // the Friday of the 40th week (minus week long breaks)
  // const endDate = session4EndDate // calculateEndDate(startDate)
  const endDate = calculateEndDate(startDate)

  // Date
  // 35 days after start date (rounded forward to Monday)
  const cancellationDate = calculateCancellationDate(startDate)
  const totalStipendAmountRecieved = calculateTotalStipendAmountRecieved()
  const programFeeMonthlyPercentage = calculateProgramFeeMonthlyPercentage()
  const stipenedMonthlyPercentage = calculateStipenedMonthlyPercentage()
  const programFeePaymentTerm = calculateProgramFeePaymentTerm()
  const stipenedFeePaymentTerm = calculateStipenedFeePaymentTerm()
  const totalFindingAmount = calculateTotalFindingAmount()
  const capPaymentAmount = calculateCapPaymentAmount()

  return {
    // Given Properties
    startDate,
    stipendAmount,
    takingTheLaptopStipend,
    expectedAnnualSalary,
    earlyExitDate,
    // Calculated Properties
    session1EndDate,
    session2EndDate,
    session3EndDate,
    session4EndDate,
    numberOfDaysInSession1,
    numberOfDaysInSession2,
    numberOfDaysInSession3,
    numberOfDaysInSession4,
    session1percentageComplete,
    session2percentageComplete,
    session3percentageComplete,
    session4percentageComplete,
    endDate,
    cancellationDate,
    totalStipendAmountRecieved,
    programFeeMonthlyPercentage,
    stipenedMonthlyPercentage,
    programFeePaymentTerm,
    stipenedFeePaymentTerm,
    totalFindingAmount,
    capPaymentAmount,
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




const calculateSessions = (startDate) => {

  const calculateSessionEndDate = function*(startDate){

    let session1EndDate = moment(startDate).day(67)
    let session2EndDate = session1StartDate.day(67)
    let session3EndDate = session2StartDate.day(67)
    let session4EndDate = session3StartDate.day(67)

    let session2StartDate = session1EndDate.day(3)
    let session3StartDate = session2EndDate.day(3)
    let session4StartDate = session3EndDate.day(3)

    yield session1EndDate
    yield session2EndDate
    yield session3EndDate
    yield session4EndDate
  }
  let result = {}
  result.session1EndDate = calculateSessionEndDate.next()
  result.session2EndDate = calculateSessionEndDate.next()
  result.session3EndDate = calculateSessionEndDate.next()
  result.session4EndDate = calculateSessionEndDate.next()

  const calculateSessionLength = function(){
    // for ( true ) {
    //   if (hasHoliday) {
    //     days - 1
    //   }
    // }
    return {
      numberOfDaysInSession1,
      numberOfDaysInSession2,
      numberOfDaysInSession3,
      numberOfDaysInSession4
    }
  }

  return {
    session1EndDate,
    session2EndDate,
    session3EndDate,
    session4EndDate,
    numberOfDaysInSession1,
    numberOfDaysInSession2,
    numberOfDaysInSession3,
    numberOfDaysInSession4
  }
}

const calculateSession2Length = function(){

}

const calculateSession3Length = function(){

}

const calculateSession4Length = function(){

}

const calculateSession1percentageComplete = function(){

}

const calculateSession2percentageComplete = function(){

}

const calculateSession3percentageComplete = function(){

}

const calculateSession4percentageComplete = function(){

}

const calculateEndDate = function(startDate){
  return moment(startDate).add(41, 'weeks').format('YYYY-MM-DD')
}


const calculateCancellationDate = function(startDate){
  return moment(startDate).add(35, 'days').format('YYYY-MM-DD')
}

const calculateTotalStipendAmountRecieved = function(){

}

const calculateProgramFeeMonthlyPercentage = function(){

}

const calculateStipenedMonthlyPercentage = function(){

}

const calculateProgramFeePaymentTerm = function(){

}

const calculateStipenedFeePaymentTerm = function(){

}

const calculateTotalFindingAmount = function(){

}

const calculateCapPaymentAmount = function(){

}


module.exports = ISACalculator
