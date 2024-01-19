import { Base } from './Base';
import { Contact } from './Contact';

export class EventModule extends Base {
  title: string;
  start: Date;
  end: Date;
  location: string;
  state: string;
  type: string;
  description: string;
  foto: string;
  changes: string[];
  address: string;
  contact: Contact[];

  constructor() {
    super(); // Call the constructor of the Base class
    this.title = '';
    this.start = new Date();
    this.end = new Date();
    this.location = '';
    this.state = '';
    this.type = '';
    this.description = '';
    this.changes = [];
    this.address = '';
    this.foto = '';
    this.contact = [];
  }
}
