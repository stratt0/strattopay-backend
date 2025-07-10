const http = require('http');
const app = require('../server');
let server;

beforeAll(done => {
  server = app.listen(0, done);
});

afterAll(done => {
  server.close(done);
});

test('GET / returns expected JSON', done => {
  const { port } = server.address();
  http.get({ port, path: '/' }, res => {
    expect(res.statusCode).toBe(200);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      expect(JSON.parse(data)).toEqual({ message: 'Welcome to Strattopay Backend' });
      done();
    });
  });
});
