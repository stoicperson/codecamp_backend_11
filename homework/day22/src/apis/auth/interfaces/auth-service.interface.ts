import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthServiceLogin {
  email: string;
  pwd: string;
}

export interface IAuthServiceAccessToken {
  user: User;
}
