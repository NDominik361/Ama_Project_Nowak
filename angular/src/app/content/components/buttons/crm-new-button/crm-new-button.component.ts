import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';

@Component({
  selector: 'crm-new-button',
  templateUrl: './crm-new-button.component.html',
  styleUrls: ['./crm-new-button.component.scss']
})
export class CrmNewButtonComponent extends AbstractButton implements OnInit {
  @Input() icon: string='fa fa-plus fa-lg';
  @Input() iconPos:any='right';
  @Input() tooltip: string='Neuen Eintrag Erstellen';
  @Input() tooltipPos: string='left';
  @Input() styleClass: string='';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
