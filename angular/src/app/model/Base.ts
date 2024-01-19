export abstract class Base {
  id: number;
  version: number;
  created: Date;
  createdBy: string;
  changed: Date;
  changedBy: string;
  deleted: boolean;

  constructor() {
    this.id = 0;
    this.version = 0;
    this.created = new Date();
    this.createdBy = '';
    this.changed = new Date();
    this.changedBy = '';
    this.deleted = false;
  }
}
