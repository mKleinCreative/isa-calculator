const expect = require('chai').expect
const sessionCalculator = require('./sessionCalculator')

describe.only('sessionCalculator', function(){
  it('calculates sessions data for a start date of 2017-06-19', function(){
    expect(sessionCalculator("2017-06-19")).to.eql({
      cancellationDate:  "2017-07-24",
      session1StartDate: "2017-06-19",
      session1EndDate:   "2017-08-25",
      session2StartDate: "2017-08-28",
      session2EndDate:   "2017-11-03",
      session3StartDate: "2017-11-06",
      session3EndDate:   "2018-01-19",
      session4StartDate: "2018-01-22",
      session4EndDate:   "2018-03-30",
      numberOfDaysInSession1: 49,
      numberOfDaysInSession2: 48,
      numberOfDaysInSession3: 45,
      numberOfDaysInSession4: 48,
    })
  })

  it('calculates sessions data for a start date of 2016-09-19', function(){
    expect(sessionCalculator("2016-09-19")).to.eql({
      cancellationDate:  "2016-10-24",
      session1StartDate: "2016-09-19",
      session1EndDate:   "2016-11-25",
      session2StartDate: "2016-11-28",
      session2EndDate:   "2017-02-10",
      session3StartDate: "2017-02-13",
      session3EndDate:   "2017-04-21",
      session4StartDate: "2017-04-24",
      session4EndDate:   "2017-07-07",
      numberOfDaysInSession1: 46,
      numberOfDaysInSession2: 47,
      numberOfDaysInSession3: 48,
      numberOfDaysInSession4: 48,
    })
  })
})
