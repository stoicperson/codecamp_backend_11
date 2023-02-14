import { Request, Response } from 'express';
import { PROVIDER_ENUM, User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';
import { IOauthUser } from 'src/commons/interfaces/oauthUser';

export interface IAuthServiceLogin {
  email: string;
  pwd: string;
  context: IContext;
}

export interface IAuthServiceAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  context: IContext;
}

export interface IAuthSocialLogin {
  req: Request & IOauthUser;
  res: Response;
  provider: PROVIDER_ENUM;
}
