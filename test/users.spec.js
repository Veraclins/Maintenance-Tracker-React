import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/server';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

let token = '';
const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1LCJ1c2VybmFtZSI6IkpvaG5Bd2Vzb21lIn0sImlhdCI6MTUzNDM0NjY0NCwiZXhwIjoxNTM2OTM4NjQ0fQ.5qsYTl7XePfSIq2496-vfGmLCqST8otVJUEPfs7thJE';
describe('Root route, /api/v1/', () => {
  it('responds with status 200', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Sees the response body', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('Root route, /', () => {
  it('responds with status 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('POST request to /api/v1/auth/login', () => {
  it('it should login the user and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'innocent@test.com',
        password: 'password',
      })
      .end((err, res) => {
        token = res.body.token; // eslint-disable-line prefer-destructuring
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });
});

describe('POST request to /api/v1/users/requests', () => {
  it('it should create a request and return it', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        title: 'General repainting',
        description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
        device: 'Smartphone',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('it should fail if the has invalid token', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .set('x-access-token', invalidToken)
      .send({
        title: 'General repainting',
        description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
        device: 'Smartphone',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('it should return Validation errors when there are validation errors', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        title: 'Gene',
        description: 'Although.',
        device: 'Geet',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('it should return Validation errors when require fields are empty', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        title: '     ',
        description: '      ',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('it should return an error if token is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({
        title: 'General repainting',
        description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
        device: 'Tablet',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests', () => {
  it('Returns a status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Returns all requests of the logged in user', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests/:requestId', () => {
  it('Returns the request with the given id', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns error if the no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/2')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/20')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});

describe('PUT request to /api/v1/users/requests/:requestId', () => {
  it('it should update a requests and return it', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/1')
      .set('x-access-token', token)
      .send({
        title: 'Excellent Work',
        description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
        device: 'Desktop',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user_id', 2);
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/20')
      .set('x-access-token', token)
      .send({
        title: 'General repainting',
        description: 'Although a downpour briefly interrupted play in the early stages of the second half, Nigeria played with more intent after half-time and went close in the 63rd minute, as John Obi Mikel saw a header saved by Vaclik.',
        device: 'Smartphone',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});
