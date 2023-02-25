import { Optional } from 'sequelize';
import { Table, Column, Model, Default, BeforeUpdate, BeforeCreate } from 'sequelize-typescript';
import { getCurrentUnixTime } from '@/helpers/miscellaneous';
import { encryptPassword } from '@/helpers/passwordAlgo';

interface PersonAttributes {
  id: number;
  name: string;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}
@Table({
  tableName: 'users',
  timestamps: false,
})
export default class User extends Model<PersonAttributes, PersonCreationAttributes> {

  @Column({
    unique: true,
    validate: {
      len: [8, 50]
    }
  })
  userName: string;

  @Column({
    unique: true,
    validate: {
      len: [8, 100]
    }
  })
  email: string;

  @Column
  password: string

  @Column
  createdAt: number;

  @Default(getCurrentUnixTime())
  @Column
  updatedAt: number;

  @Column
  deletedAt: number;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await encryptPassword(user.password);
  }

  @BeforeCreate
  static createdAt(user: User) {
    user.createdAt = getCurrentUnixTime();
  }
}