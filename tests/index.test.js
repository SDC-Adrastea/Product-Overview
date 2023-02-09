const request = require('supertest');
const app = require('../app');

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

describe('server endpoint /products/', () => {
  test('should return an item', async () => {
    const res = await request(app)
      .get('/products/')
    expect(res.statusCode).toEqual(200)
  })
})

describe('server endpoint /products/:id', () => {
  test('should return an item', async () => {
    const res = await request(app)
      .get('/products/6969/')
    expect(res.statusCode).toEqual(200)
  })
})

describe('server endpoint /products/:id/styles', () => {
  test('should return an item', async () => {
    const res = await request(app)
      .get('/products/6969/styles')
    expect(res.statusCode).toEqual(200)
  })
})

describe('server endpoint /products/:id/related', () => {
  test('should return an item', async () => {
    const res = await request(app)
      .get('/products/6969/related')
    expect(res.statusCode).toEqual(200)
  })
})