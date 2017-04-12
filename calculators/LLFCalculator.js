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
} = require('../data')

module.exports = function(spec){

  const {
    learnerLivingFundStipendAmount,
    takingTheLaptopStipend
  } = spec

  let livingFundMonthlyPercentage =
    Math.round((learnerLivingFundStipendAmount / 13846) * 7.5) / 100

  if(takingTheLaptopStipend) {
    livingFundMonthlyPercentage++
  }

  return { livingFundMonthlyPercentage }
}
