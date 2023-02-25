// @BaseRepository(userModel)

import { BaseRepository } from "@/decorators/baseRepository";
import { Service } from "typedi";
import UserModel from './user.model';
// user repo
@Service()
@BaseRepository(UserModel)
export default class UserRepository {
  create: Function
  findOne: Function
}
