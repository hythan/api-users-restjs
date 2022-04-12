import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  encodePassword(password: any) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
  }

  comparePassword(password: any, hash: any) {
    return bcrypt.compareSync(password, hash);
  }
}
