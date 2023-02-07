import { Optional } from 'sequelize';
import { Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
interface PersonAttributes {
  id: number;
  name: string;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}
@Table({
  paranoid: true,
  tableName: 'users'
})
export default class User extends Model<PersonAttributes, PersonCreationAttributes> {

  @Column
  userName: string;

  @Column
  email: string;

  @Column
  password: string

  @CreatedAt
  creationDate: BigInt;

  @UpdatedAt
  updatedOn: BigInt;

  @DeletedAt
  deletionDate: BigInt;
}