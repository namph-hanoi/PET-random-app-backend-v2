import User, { PersonCreationAttributes } from '@/components/User/user.model';
import { encryptPassword } from '@/helpers/passwordAlgo';

interface IMockedUserInfo {
  userName: string,
  email: string,
  password: string,
}

const createMockedUser = async (mockedUser: IMockedUserInfo) => User.build({
  ...mockedUser,
  password: await encryptPassword('vvvvvvvv'),
});

export default createMockedUser;
