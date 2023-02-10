import { Response, Request } from 'express';

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}

interface IAuthUser {
  user?: {
    id: string;
  };
}
