const expect = require('chai').expect
const ISACalculator = require('./')

describe('ISACalculator', function(){

  it('should validate input', function(){
    expect(ISACalculator()).to.be.false

    const expectThisSpec = function(spec){
      return expect(function(){
        ISACalculator(spec)
      })
    }

    expectThisSpec({}).to.throw('startDate must be a Date')

    const julyStartDate = '2016-07-05'

    expectThisSpec({
      startDate: julyStartDate,
    }).to.throw('stipendAmount must be an integer')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 1.1,
    }).to.throw('stipendAmount must be an integer')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
    }).to.throw('takingTheLaptopStipend must be a boolean')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: 'yes',
    }).to.throw('takingTheLaptopStipend must be a boolean')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: '$$$',
    }).to.throw('expectedAnnualSalary must be an integer')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 100,
    }).to.throw('expectedAnnualSalary must be greater than $50,000')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 150000,
      earlyExitDate: 5,
    }).to.throw('earlyExitDate must be a Date')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 150000,
      earlyExitDate: julyStartDate,
    }).to.throw('earlyExitDate must be after startDate')

    expectThisSpec({
      startDate: julyStartDate,
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 150000,
      earlyExitDate: '2016-06-01',
    }).to.throw('earlyExitDate must be after startDate')

  })

  it('should calculate good', function(){
    expect(ISACalculator({
      startDate: '2016-07-05',
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 150000,
    })).to.deep.equal({
      startDate: '2016-07-05',
      stipendAmount: 0,
      takingTheLaptopStipend: true,
      expectedAnnualSalary: 150000,
      earlyExitDate: undefined,
      endDate: '2017-04-18',
      cancellationDate: '2016-08-09',
      expectedISAProgramFeeMonthlyPayment: undefined,
      expectedISAStipenedMonthlyPayment: undefined,
      earlyExitISAProgramFeeMonthlyPayment: undefined,
      earlyExitISAStipenedMonthlyPayment: undefined,
      programFeePaymentTerm: undefined,
      totalFindingAmount: undefined,
    })
  })

})
