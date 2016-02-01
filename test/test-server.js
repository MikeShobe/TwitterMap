var server = require('../server/server.js');

describe('server', function () {
  before(function () {
    server.listen(3000);
  });

  after(function () {
    server.close();
  });
});