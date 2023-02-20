import { compare, genSalt, hash } from 'bcryptjs';

export async function encryptPassword(password: string){
  const salt = await genSalt();
  return hash(password, salt);
}

export async function validatePassword(password: string, accountPassword: string){
  return compare(password, accountPassword);
}