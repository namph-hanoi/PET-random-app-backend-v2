
import chai from 'chai';
import sinon from 'sinon';
import { Response } from 'superagent';
import chaiHttp from 'chai-http';
import server from '../server';
import createMockedUser from './__mock__/user';
import { UserService } from '@/components/User/user.service';
import injector from 'typedi';
import User from '@/components/User/user.model';

chai.use(chaiHttp);

const { expect } = chai;
const userService = injector.get(UserService);


describe('(I&T Tests) Testing auth/login routes', () => {
  let chaiHtppResponse: Response;

  describe('Route GET', () => {
    before(async () => {
      const mockedUser = await createMockedUser({
        userName: 'Nam Phan',
        email: 'namph.tech@gmail.com',
        password: 'vvvvvvvv',
      })
      sinon
        .stub(userService, 'findOne')
        .resolves(mockedUser as User)
    });

    after(() => {
      (userService.findOne as sinon.SinonStub).restore();
    });

    it('Success Case - Returns status 200 and a json containing all registered user', async () => {
      chaiHtppResponse = await chai
        .request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'namph.tech@gmail.com',
          password: 'vvvvvvvv'
        });

      expect(chaiHtppResponse.status).to.be.equal(200);
      expect(chaiHtppResponse.body.accessToken).to.not.be.empty;
    });
  });
});
