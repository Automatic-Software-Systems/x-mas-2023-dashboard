import { LodgeUserInterface } from "./user.interface";
import { PermissionEnum } from "../enums";

export interface LoginInterface {
  name: string;
  password: string;
}

export interface SignupInterface extends LoginInterface {
  organization_name?: string;
  passwordConfirm: string;
}

export interface SessionInterface {
  access_token: string;
  user: LodgeUserInterface;
}

export interface CookieInterface {
  access_token: string;
}

export interface TokenInterface {
  uid: string;
  oid: string | undefined;
  acc: PermissionEnum.USER | PermissionEnum.ADMIN;
}
