const request = require('supertest');
const app = require('../../app');

describe('Test GET /launches', () => {
  test('Should respond with 200 success', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200);
  });
});

describe('Test POST /launch', () => {
  const completeLaunchData = {
    mission: 'Falcon',
    rocket: 'Saturn VI',
    target: 'Kepler YYY',
    launchDate: 'January 4, 2028',
  };
  const launchDataWithInvalidDate = {
    mission: 'Falcon',
    rocket: 'Saturn VI',
    target: 'Kepler YYY',
    launchDate: 'oops',
  };
  const launchDataWithoutDate = {
    mission: 'Falcon',
    rocket: 'Saturn VI',
    target: 'Kepler YYY',
  };
  
  test('Should respond with 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });
  
  test('Should catch missing required prop', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });
  
  test('Should catch invalid dates', async () => {
    const response = await request(app)
      .post('/launches')
      .send(launchDataWithoutDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing required launch property',
    });
  });
});
