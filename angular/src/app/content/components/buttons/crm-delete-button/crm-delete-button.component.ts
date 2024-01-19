import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-delete-button',
  templateUrl: './crm-delete-button.component.html',
  styleUrls: ['./crm-delete-button.component.scss']
})
export class CrmDeleteButtonComponent extends AbstractButton implements OnInit {
  @Input() icon: string = 'fa fa-trash fa-lg';
  @Input() iconPos: any = 'left';
  @Input() iconFa: IconDefinition;
  @Input() tooltipText: string = 'Eintrag Löschen';
  @Input() tooltipPos: string = 'left';
  @Input() styleClass: string = '';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
