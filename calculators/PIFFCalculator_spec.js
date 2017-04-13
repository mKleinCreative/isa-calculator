const expect = require('chai').expect
const PIFFCalculator = require('./PIFFCalculator')

describe.only('PIFFCalculator', function(){
  it('calculates the right amount of money owed for a full successful term at Learner\'s guild for the PIFF', function(){
    expect(PIFFCalculator({
      programStartDate: '2017-06-19',
      programTerminationDate: '2018-03-30',
    })).to.eql({
      session1FundingAmount:              1700000,
      session2FundingAmount:              850000,
      session3FundingAmount:              425000,
      session4FundingAmount:              0,
      rebate:                             true,
      payItForwardFundPaymentTerm:        36,
      payItForwardFundTotalFundingAmount: 2550000,
    })
  })
  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the PIFF', function(){
    expect(PIFFCalculator({
      programStartDate: '2017-06-19',
      programTerminationDate: '2017-12-21',
    })).to.eql({
      session1FundingAmount:              1700000,
      session2FundingAmount:              850000,
      session3FundingAmount:              0,
      session4FundingAmount:              0,
      rebate:                             false,
      payItForwardFundPaymentTerm:        36,
      payItForwardFundTotalFundingAmount: 2975000,
    })
  })
})
