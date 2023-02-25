import { Model } from 'sequelize';
import { instanceToPlain } from 'class-transformer';

// Inspired by APS flask backend
export function BaseRepository(model: any) {
  return function (constructor: Function) {
    const _this = constructor.prototype;
    _this.model = model
    _this.findOne = async function<T extends {[key: string]: any}>(modelProperties: T) {

      const foundItem = await _this.model?.findOne({
        where: modelProperties
      });
      return foundItem;
    }
    _this.create = async function(dtoObject: any) { 
      const createdItem = await _this.model?.create(instanceToPlain(dtoObject));
      return createdItem;
    }
  }
}
