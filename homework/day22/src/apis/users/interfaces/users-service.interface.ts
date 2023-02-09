import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

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

export class IUserServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}

export class IUserServiceUpdatePwd {
  userId: string;
  pwd: string;
}
