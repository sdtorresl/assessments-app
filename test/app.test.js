const request = require('supertest');

const app = require('../src/app');

describe('App', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/a-missinng-page')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Welcome to Assessments API'
      }, done);
  });
});
