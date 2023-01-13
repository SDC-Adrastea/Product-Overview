const request = require('supertest');
const app = require('../../app');

describe('Sanity test', () => {
  test('1 should equal 1', () => {
    expect(1).toBe(1)
  })
})

describe('server endpoint /', () => {
  test('should return hello world as text', async () => {
    const res = await request(app)
      .get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual("Hello World!")
  })
})