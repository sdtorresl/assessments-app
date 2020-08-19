const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Assessments API'
      }, done);
  });
});

describe('POST /api/v1/assessments/create/:id', () => {
  it('responds with a json message', (done) => {
    request(app)
      .post('/api/v1/assessments/create/179')
      .send({
        "Name": "Sergio",
        "Surname": "Torres",
        "Email": "test@mailinator.com",
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
});

describe('POST /api/v1/assessments/:id/start', () => {
  it('Responds with a json message', async () => {
    const res = await request(app)
      .post('/api/v1/assessments/create/179')
      .send({
        "Name": "Sergio",
        "Surname": "Torres",
        "Email": "test@mailinator.com",
      });

    testId = res.body.Data;

    request(app)
      .post(`/api/v1/assessments/${testId}/start`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

describe('GET /api/v1/assessments/:id', () => {
  it('Responds with a json message', async () => {
    const res = await request(app)
      .post('/api/v1/assessments/create/179')
      .send({
        "Name": "Sergio",
        "Surname": "Torres",
        "Email": "test@mailinator.com",
      });

    testId = res.body.Data;

    request(app)
      .get(`/api/v1/assessments/${testId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
  });
});

describe('POST /api/v1/:id/answer', () => {
  it('Responds with a json message', async () => {
    let postData = {
      "QuestionId": 0,
      "OptionId": 7708761,
      "AnsweredText": null,
      "ChildQuestionAnsweredText": null,
      "ChildQuestionAnsweredText2": null
    };
    const createRes = await request(app)
      .post('/api/v1/assessments/create/179')
      .send({
        "Name": "Sergio",
        "Surname": "Torres",
        "Email": "test@mailinator.com",
      });

    testId = createRes.body.Data;

    request(app)
      .post(`/api/v1/assessments/${testId}/answer`)
      .set('Accept', 'application/json')
      .send(postData)
      .expect(200);

    // Post an invalid answer
    postData.QuestionId = 0;
    request(app)
      .post(`/api/v1/assessments/${testId}/answer`)
      .set('Accept', 'application/json')
      .send(postData)
      .expect(400);
  });
});