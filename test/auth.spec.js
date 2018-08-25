import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/server';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

describe('POST request to /api/v1/auth/signup', () => {
  it('it should create a user and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'andela@test.com',
        firstName: 'Andela',
        lastName: 'Samuel',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should fail is the email is already registered', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'andela@test.com',
        firstName: 'Andela',
        lastName: 'Samuel',
        password: 'password',
        passwordConfirmation: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('it should return error message and a status 400 if there are validation errors', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'andelacom',
        firstName: 'An',
        lastName: 'Sa',
        password: 'pass',
        passwordConfirmation: 'passwor',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object');
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
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('it should validation errors when there are validation errors', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'innocent',
        password: 'pass',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        done();
      });
  });

  it('it should return error and 401 if the password is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'innocent@test.com',
        password: 'passworded',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('Error');
        done();
      });
  });

  it('it should return error and 401 if the email is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'lovelteueue@test.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('Error');
        done();
      });
  });
});
