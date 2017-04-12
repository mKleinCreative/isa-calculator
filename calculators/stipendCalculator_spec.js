const expect = require('chai').expect
const stipendCalculator = require('./')

describe('stipendCalculator', function(){

  it('should validate input', function(){
    expect(stipendCalculator()).to.be.false

    const expectThisSpec = function(spec){
      return expect(function(){
        stipendCalculator(spec)
      })
    }
  })
})
