const expect = require('chai').expect
const stipendCalculator = require('./LLFCalculator')

describe('LFFCalculator', function(){
  it('calculates the right amount of money owed for a full successful term at Learner\'s guild for the LLF', function(){
    expect(LLFCalculator({
      learnerLivingFundStipendAmount: 1384600,
      takingTheLaptopStipend: true,
    })).to.eql({
      // 15692 / (15692 * 8.5%)
      'livingFundMonthlyPercentage': 8.5,
      'laptopStipened':              true,
      'livingFundPaymentTerm':       36,
    })
  })
  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the LLF', function(){
    expect(LLFCalculator({
      learnerLivingFundStipendAmount: 946130,
      takingTheLaptopStipend: true,
    })).to.eql({
      // 15692 / (15692 * 8.5%)
      'livingFundMonthlyPercentage': 5.12,
      'laptopStipened':              true,
      'livingFundPaymentTerm':       36,
    })
  })
})
