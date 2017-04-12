const expect = require('chai').expect
const stipendCalculator = require('./stipendCalculator')

describe('stipendCalculator', function(){
  it('calculates the right amount of money owed for a full successful term at Learner\'s guild', function(){
    expect(stipendCalculator({
      stipendAmount: 13846.00,
      takingTheLaptopStipend: true, // 1846.00
    })).to.eql({
      'totalFundingAmount':          15692,
      // 15692 / (15692 * 8.5%)
      'livingFundMonthlyPercentage': 8.5,
      'programFeeMonthlyPercentage': 12.5, // STATIC
      'laptopStipened':              true,
      'session1FundingAmount':       17000,
      'session2FundingAmount':       8500,
      'session3FundingAmount':       4250,
      'session4FundingAmount':       0,
      'rebate':                      true,
      'totalPercentOfFutureSalary':  21,
      'stipenedFeePaymentTerm':      36,
      'livingFundPaymentTerm':       36,
    })
  })
  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting', function(){
    expect(stipendCalculator(percentageTaken)).to.eql({
      'totalFundingAmount':          9461.3,
      'livingFundMonthlyPercentage': 8.5,
      'programFeeMonthlyPercentage':  12.5,
      'laptopStipened':              true,
      'session1FundingAmount':       17000,
      'session2FundingAmount':       8500,
      'session3FundingAmount':       4250,
      'session4FundingAmount':       0,
      'rebate':                      true,
      'totalPercentOfFutureSalary':  21,
      'stipenedFeePaymentTerm':      26,
      'livingFundPaymentTerm':       42,
    })
  })
})
