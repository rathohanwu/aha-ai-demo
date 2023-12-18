import * as service from './service';
import {SignMethod} from '../utils/jwt';

export function getUsers(email: string, signMethod: SignMethod) {
  return service.getUsers(email, signMethod);
}

export function getUserOverview() {
  return service.getUserOverview();
}
