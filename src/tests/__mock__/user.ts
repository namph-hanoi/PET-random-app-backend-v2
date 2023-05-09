import { Sequelize, ModelCtor } from 'sequelize-typescript';
import User from '@/components/User/user.model';
import { encryptPassword } from '@/helpers/passwordAlgo';

interface IMockedUserInfo {
  userName: string,
  email: string,
  password: string,
  role: 'admin' | 'user'
}

const createMockedUser = async (mockedUser: IMockedUserInfo, sequelize: Sequelize) => {
  sequelize.addModels([User]);
  return User.build({
    ...mockedUser,
    password: await encryptPassword('vvvvvvvv'),
  });

};

export default createMockedUser;
