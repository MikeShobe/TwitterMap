var request = require('supertest');
var server = require('../server/server.js');

describe('server', function(){
  it('Responds with 200', function(done){
    request(server)
      .get('/')
      .expect(200,done)
  });

  // it('Test two', function(){
  //   expect(true).to.be.false;
  // });

  // it('Test three', function(){
  //   expect(false).to.be.false;
  // });

});