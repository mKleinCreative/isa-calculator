const expect = require('chai').expect
const sessionCalculator = require('./sessionCalculator')

describe.only('sessionCalculator', function(){
  it('Calculates four sessions', function(){
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
})
