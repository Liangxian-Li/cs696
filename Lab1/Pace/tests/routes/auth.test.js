const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');

describe('Auth routes', () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('POST /api/auth/signup should create a new user', async () => {
    const ts = Date.now();

    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        username: `testuser_${ts}`,
        email: `test_${ts}@example.com`,
        password: '123456',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username');
    expect(res.body.email).toBe(`test_${ts}@example.com`);
  });
});
