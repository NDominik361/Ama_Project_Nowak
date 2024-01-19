import { Base } from './Base';
import { EventModule } from './Event';
import { Organization } from './Organization';

export class Contact extends Base {
  vorname: string;
  nachname: string;
  vip: boolean;
  anrede: string;
  akadTitel: string;
  organization: string; // Assuming organization is a string, might be a link to an Organization model
  telefonNr: string;
  adresse: string;
  foto: string;
  events: EventModule[];

  constructor() {
    super();
    this.vorname = '';
    this.nachname = '';
    this.vip = false;
    this.anrede = '';
    this.akadTitel = '';
    this.organization = '1';
    this.telefonNr = '';
    this.adresse = '';
    this.foto = '';
    this.events = [new EventModule()];
  }
}
