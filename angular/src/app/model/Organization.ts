import { Base } from './Base';

export class Organization extends Base {
  name: string;
  address: string;
  region: string;
  country: string;
  uid: string; // tax id
  foto: string;
  url: string;

  constructor() {
    super();
    this.name = '';
    this.address = '';
    this.region = '';
    this.country = '';
    this.uid = '';
    this.foto = '';
    this.url = '';
  }
}
