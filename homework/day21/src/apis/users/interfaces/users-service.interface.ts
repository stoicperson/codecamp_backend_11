import { CreateUserInput } from '../dto/create-user.input';

export class IUserServiceCreate {
  createUserInput: CreateUserInput;
}

export class IUserServiceFindOneByEmail {
  email: string;
}

export class IUserServiceGetHasedPwd {
  pwd: string;
}

export class IUserServiceFindOne {
  userId: string;
}

export class IUserServiceDelete {
  userId: string;
}
