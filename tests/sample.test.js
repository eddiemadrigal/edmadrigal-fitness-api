const app = require('../api/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Sample Test', ()=> {

  const user = {
    username: "testuser1",
    password: "password8",
    fname: "Test",
    lname: "User"
  }

  it('should test that true === true', () => {
    expect(true).toBe(true)
  })

  it('should be true that 1 != 2', () => {
    expect(1).not.toBe(2)
  })

  it('should async test to /', async done => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('API up ...')
    done() 
  })

  it('should async test to /api/users', async done => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(200)
    done() 
  })

  it('should create a new user /api/users', async done => {
    const response = await request
      .post('/api/users')
      .send(user)
    expect(response.status).toBe(200)
    done() 
  })

})