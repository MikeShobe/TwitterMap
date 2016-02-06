var request = require('supertest');
var expect = require('chai').expect;
var server = require('../server/server.js');

describe('server', function(){
  it('Responded with status code of 200', function(done){
    request(server)
      .get('/')
      .expect(200, done)
  });

  it('Should have access to index.html', function(done){
    request(server)
      .get('/')
      .set('Accept', 'text/html')
      .expect(200)
      .end(function(err, res){
        expect(res).to.have.property('text');
        expect(res.text).to.not.equal(null);
        done();
      })
  });

  // it('Should be accessing tweets from stream/socket', function(done){
  //   request(server)
  //     .get('/')
  //     .set('Accept', 'application/json')
  //     .expect(200)
  //     .end(function(err, res){
  //       console.log(res.text);
  //       expect(res).to.have.property('text');
  //       expect(res.text).to.not.equal(null);
  //       done();
  //     })
  // });

});