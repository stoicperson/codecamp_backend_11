import { PROVIDER_ENUM } from 'src/apis/users/entities/user.entity';

export interface IProvider {
  params: {
    soical: PROVIDER_ENUM;
  };
}
