var expect = require('chai').expect;
var server = require('../server/server.js');

describe('server', function(){
  it('Test one', function(){
    expect(true).to.be.true;
  });

  it('Test two', function(){
    expect(true).to.not.be.false;
  });

  it('Test three', function(){
    expect(1).to.eql(1);
  });

});