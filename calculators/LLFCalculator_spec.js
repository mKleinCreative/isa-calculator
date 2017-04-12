const expect = require('chai').expect
const LLFCalculator = require('./LLFCalculator')

describe.only('LFFCalculator', function(){
  it('calculates the right amount of money owed for a full successful term at Learner\'s guild for the LLF', function(){
    expect(LLFCalculator({
      learnerLivingFundStipendAmount: 1384600,
      takingTheLaptopStipend: true,
    })).to.eql({
      // 15692 / (15692 * 8.5%)
      'livingFundMonthlyPercentage': 8.5
    })
  })
  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the LLF', function(){
    expect(LLFCalculator({
      learnerLivingFundStipendAmount: 946130,
      takingTheLaptopStipend: false,
    })).to.eql({
      // 15692 / (15692 * 8.5%)
      'livingFundMonthlyPercentage': 5.12
    })
  })
})
