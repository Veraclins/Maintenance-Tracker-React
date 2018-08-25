import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../../src/server';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

describe('Prepare the database, /api/v1/data', () => {
  it('responds with status 200', (done) => {
    chai.request(server)
      .get('/api/v1/data')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
