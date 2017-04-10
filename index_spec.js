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

  describe('should calculate correctly for', function(){
    //
    it('scenario v3', function(){
      expect(ISACalculator({
        startDate: '2016-07-05',
        stipendAmount: 13846.00,
        takingTheLaptopStipend: true, // 1846.00
      })).to.deep.equal({
        startDate: '2016-07-05',
        stipendAmount: 0,
        takingTheLaptopStipend: true,
        expectedAnnualSalary: undefined,
        earlyExitDate: undefined,
        endDate: '2017-04-18',
        cancellationDate: '2016-08-09',
        totalStipendAmountRecieved: 15692.00,
        programFeeMonthlyPercentage: 12.5, // <--- STATIC
        // totalStipendAmountTaken / (maxStipendAmount[15692] * 8.5%)
        // 15692 / (15692 * 8.5%)
        stipenedMonthlyPercentage: 8.5, // %
        //
        // (0...42) months
        programFeePaymentTerm: 36, // Months
        stipenedFeePaymentTerm: 36, // Months STATIC
        //
        totalFindingAmount: 25500.00,
        // (totalFindingAmount * 2)
        capPaymentAmount: 51000.00,
      })
    })
    it('scenario 2', function(){
      expect(ISACalculator({
        startDate: '2017-06-19',
        stipendAmount: 0,
        takingTheLaptopStipend: true,
      })).to.deep.equal({
        startDate: '2017-06-19',
        stipendAmount: 0,
        takingTheLaptopStipend: true,
        expectedAnnualSalary: undefined,
        earlyExitDate: undefined,
        endDate: '2018-04-02',
        cancellationDate: '2017-07-24',
        expectedISAProgramFeeMonthlyPayment: undefined,
        expectedISAStipenedMonthlyPayment: undefined,
        earlyExitISAProgramFeeMonthlyPayment: undefined,
        earlyExitISAStipenedMonthlyPayment: undefined,
        programFeePaymentTerm: undefined,
        totalFindingAmount: undefined,
      })
    })
  })
})
