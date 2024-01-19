import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {Base} from './Base';

export class User extends Base {
  firstname: string;
  lastname: string;
  fullName: string;
  fullNameWithAcademicDegrees: string;
  loginName: string;
  email: string;
  roles: String[] = [];
  rolesDisplayString
  departments: string[] = [];
  password: string = '';

  static createFromData(userdata: User): User | null {
    return userdata ? Object.assign(userdata) : null;
  }

  
  constructor(
    firstname: string,
    lastname: string,
    fullName: string,
    fullNameWithAcademicDegrees: string,
    loginName: string,
    email: string,
    roles: string[] = [],
    rolesDisplayString: string,
    departments: string[] = [],
    password: string = ''
  ) {
    super();
    this.firstname = firstname? firstname : '';
    this.lastname = lastname ? lastname : '';
    this.fullName = fullName ? fullName : '';
    this.fullNameWithAcademicDegrees = fullNameWithAcademicDegrees ? fullNameWithAcademicDegrees : '';
    this.loginName = loginName ? loginName : '';
    this.email = email ? email : '';
    this.roles = roles ? roles : [];
    this.rolesDisplayString = rolesDisplayString ? rolesDisplayString : '';
    this.departments = departments ? departments : [];
    this.password = password ? password : '';
  }

  static initFormGroupFromUser(user: User, fb: UntypedFormBuilder): UntypedFormGroup {
    return fb.group({
      id:          [user?.id],
      version:     [user?.version],
      firstname:   [user?.firstname],
      lastname:    [user?.lastname],
      fullName:    [user?.fullName],
      loginName:   [user?.loginName],
      email:       [user?.email],
      roles:       [user?.roles],
      departments: [user?.departments],
      password:    [user?.password],

    });
  }
}
