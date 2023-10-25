export class UserToken {
  constructor(userType, sub, iat, exp) {
    this.userType = userType;
    this.sub = sub;
    this.iat = iat;
    this.exp = exp;
  }
}