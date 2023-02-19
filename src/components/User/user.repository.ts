// @BaseRepository(userModel)

import { BaseRepository } from "@/decorators/baseRepository";
import { instanceToPlain } from "class-transformer";
import { Model } from "sequelize-typescript";
import { Service } from "typedi";
import UserModel from './user.model';
// user repo
@Service()
@BaseRepository(UserModel)
export default class UserRepository {
  
}
