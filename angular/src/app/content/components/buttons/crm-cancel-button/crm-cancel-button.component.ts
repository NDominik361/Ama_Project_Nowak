import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-cancel-button',
  templateUrl: './crm-cancel-button.component.html',
  styleUrls: ['./crm-cancel-button.component.scss']
})
export class CrmCancelButtonComponent extends AbstractButton implements OnInit {
  @Input() label: string = 'Abbrechen';
  @Input() icon: string = 'fa fa-times fa-lg';
  @Input() iconFa: IconDefinition;
  @Input() iconPos: any = 'right';
  @Input() tooltipText: string = 'Vorgang Abbrechen';
  @Input() tooltipPos: string = 'left';
  @Input() styleClass: string = '';

  // @Input() left: string='left';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
