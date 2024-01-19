/*
  This is the UserDetail as returned from server after login.
  It is different to the User class, which represents the entity that ist stored to the DB.
 */
export class UserDetail {
  username: string = "";
  password: string = "";
  actingUser: string = "";
  roles: string[] = [];
  rolesDisplayString: string = "";
  permissions: string[] = [];
}
