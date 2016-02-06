var request = require('supertest');
var server = require('../server/server.js');

describe('server', function(){
  it('Responded with status code of 200', function(done){
    request(server)
      .get('/')
      .expect(200, done)
  });

  // it('Responded with JSON', function(done){
  //   request(server)
  //     .get('/')
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     console.log(request(server))
  //     done()
  // });

});