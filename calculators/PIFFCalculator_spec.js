const expect = require('chai').expect
const PIFFCalculator = require('./PIFFCalculator')

describe.only('PIFFCalculator', function(){

  it('calculates the right amount of money owed for a full successful term at Learner\'s guild for the PIFF', function(){
    expect(PIFFCalculator({
      programStartDate:                   '2017-06-19',
      cancellationDate:                   '2017-07-24',
      session1StartDate:                  '2017-06-19',
      session1EndDate:                    '2017-08-25',
      session2StartDate:                  '2017-08-28',
      session2EndDate:                    '2017-11-03',
      session3StartDate:                  '2017-11-06',
      session3EndDate:                    '2018-01-19',
      session4StartDate:                  '2018-01-22',
      session4EndDate:                    '2018-03-30',
      numberOfDaysInSession1:             49,
      numberOfDaysInSession2:             48,
      numberOfDaysInSession3:             45,
      numberOfDaysInSession4:             48,
    })).to.eql({
      session1FundingAmount:              1700000,
      session2FundingAmount:              850000,
      session3FundingAmount:              425000,
      session4FundingAmount:              0,
      recievedPayItForwardFundRebate:     true,
      payItForwardFundPaymentTerm:        36,
      payItForwardFundTotalFundingAmount: 2550000,
    })
  })

  context('when given an invalid early exit date', function(){
    it('should throw an error', function(){
      expect(function(){
        PIFFCalculator({
          programStartDate:       '2017-06-19',
          earlyExitDate:          '1999-01-01', // BAD DATE
          cancellationDate:       '2017-07-24',
          session1StartDate:      '2017-06-19',
          session1EndDate:        '2017-08-25',
          session2StartDate:      '2017-08-28',
          session2EndDate:        '2017-11-03',
          session3StartDate:      '2017-11-06',
          session3EndDate:        '2018-01-19',
          session4StartDate:      '2018-01-22',
          session4EndDate:        '2018-03-30',
          numberOfDaysInSession1: 49,
          numberOfDaysInSession2: 48,
          numberOfDaysInSession3: 45,
          numberOfDaysInSession4: 48,
        })
      }).to.throw('invalid earlyExitDate')
    })
  })

  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the PIFF', function(){
    expect(PIFFCalculator({
      programStartDate:                   '2017-06-19',
      earlyExitDate:                      '2017-12-21',
      cancellationDate:                   '2017-07-24',
      session1StartDate:                  '2017-06-19',
      session1EndDate:                    '2017-08-25',
      session2StartDate:                  '2017-08-28',
      session2EndDate:                    '2017-11-03',
      session3StartDate:                  '2017-11-06',
      session3EndDate:                    '2018-01-19',
      session4StartDate:                  '2018-01-22',
      session4EndDate:                    '2018-03-30',
      numberOfDaysInSession1:             49,
      numberOfDaysInSession2:             48,
      numberOfDaysInSession3:             45,
      numberOfDaysInSession4:             48,
    })).to.eql({
      session1FundingAmount:              1700000,
      session2FundingAmount:              850000,
      session3FundingAmount:              425000,
      session4FundingAmount:              0,
      recievedPayItForwardFundRebate:     false,
      payItForwardFundPaymentTerm:        42,
      payItForwardFundTotalFundingAmount: 2975000,
    })
  })

  it('calculates the right amount of money owed for three sessions at Learner\'s guild before exiting for the PIFF', function(){
    expect(PIFFCalculator({
      programStartDate:                   '2017-06-19',
      earlyExitDate:                      '2017-12-07',
      cancellationDate:                   '2017-07-24',
      session1StartDate:                  '2017-06-19',
      session1EndDate:                    '2017-08-25',
      session2StartDate:                  '2017-08-28',
      session2EndDate:                    '2017-11-03',
      session3StartDate:                  '2017-11-06',
      session3EndDate:                    '2018-01-19',
      session4StartDate:                  '2018-01-22',
      session4EndDate:                    '2018-03-30',
      numberOfDaysInSession1:             49,
      numberOfDaysInSession2:             48,
      numberOfDaysInSession3:             45,
      numberOfDaysInSession4:             48,
    })).to.eql({
      session1FundingAmount:              1700000,
      session2FundingAmount:              850000,
      session3FundingAmount:              198333.33333333334,
      session4FundingAmount:              0,
      recievedPayItForwardFundRebate:     false,
      payItForwardFundPaymentTerm:        38.8,
      payItForwardFundTotalFundingAmount: 2748333.3333333335,
    })
  })

})
