import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(useEmail: string, userPassword: string) {
    const user = await this.usersService.findByEmail(useEmail);
    if (user && user.password === userPassword) {
      const { id, name, email } = user;
      return { id: id, name, email };
    }

    return null;
  }
}
