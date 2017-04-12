const expect = require('chai').expect
const stipendCalculator = require('./PIFFCalculator')

describe('PIFFCalculator', function(){
  it('calculates the right amount of money owed for a full successful term at Learner\'s guild for the PIFF', function(){
    expect(PIFFCalculator( '2017-06-19', '2018-03-30' )).to.eql({
      'programFeeMonthlyPercentage':        12.5, // STATIC
      'laptopStipened':                     true,
      'session1FundingAmount':              1700000,
      'session2FundingAmount':              850000,
      'session3FundingAmount':              425000,
      'session4FundingAmount':              0,
      'rebate':                             true,
      'payItForwardFundPaymentTerm':        36,
      'payItForwardFundTotalFundingAmount': 2550000,
    })
  })
  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the PIFF', function(){
    expect(PIFFCalculator( '2017-06-19', '2017-12-21' )).to.eql({
      'programFeeMonthlyPercentage':        12.5,
      'session1FundingAmount':              1700000,
      'session2FundingAmount':              850000,
      'session3FundingAmount':              425000,
      'session4FundingAmount':              0,
      'rebate':                             false,
      'payItForwardFundPaymentTerm':        36,
      'payItForwardFundTotalFundingAmount': 2975000,
    })
  })
})
