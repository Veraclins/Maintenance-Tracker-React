import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/server';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

let adminToken = '';
let token = '';
describe('GET request to /api/v1/requests', () => {
  it('it should login an Admin and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'clinton@test.com',
        password: 'password',
      })
      .end((err, res) => {
        adminToken = res.body.token; // eslint-disable-line prefer-destructuring
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('Returns all requests in the database for an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('it should login an ordinary user and return a token', (done) => {
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

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/approve', () => {
  it('Approve a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/approve')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        device: 'Smartphone',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('Returns status 400 and an error message when the id is not a number', (done) => {
    chai.request(server)
      .put('/api/v1/requests/love/approve')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        device: 'Laptop',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});

describe('GET request to /api/v1/requests/3/disapprove', () => {
  it('Disapprove a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/3/disapprove')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/3/disapprove')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/3/disapprove')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/disapprove')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        device: 'Tablet',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/resolve', () => {
  it('Resolve a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/resolve')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        device: 'Desktop',
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});
