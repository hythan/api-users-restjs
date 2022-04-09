import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  encodePassword(password: string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
