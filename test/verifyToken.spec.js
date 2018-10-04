import chai from 'chai';
import chaiHttp from 'chai-http';
import { createToken, verifyToken } from '../src/server/middlewares/tokenHandler';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

let token = '';
describe('Create Token', () => {
  it('should sign a token and return it', (done) => {
    token = createToken({ id: 1 });
    expect(token).to.be.a('string');
    done();
  });
});
describe('Verify Token', () => {
  // This is to fake the express req and res objects
  const req = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'x-access-token': '',
    },
  };

  const res = {
    body: {},
    status(status) {
      this.status = status;
      return this;
    },
    send(data) {
      this.body = data;
      return this;
    },
  };
  const next = (Error = '') => Error;

  it('should return error if there is no token in the header', (done) => {
    const verified = verifyToken(req, res, next);
    expect(verified.body).to.be.an('object');
    expect(verified.body).to.have.property('status').to.equal('error');
    done();
  });
});
