import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-action-button',
  templateUrl: './crm-action-button.component.html',
  styleUrls: ['./crm-action-button.component.scss']
})
export class CrmActionButtonComponent extends AbstractButton implements OnInit {
  @Input() label: string = 'Speichern';
  @Input() icon: string = 'fa fa-save fa-lg';
  @Input() iconPos: any = 'right';
  @Input() tooltipText: string = '';
  @Input() iconFa: IconDefinition;
  @Input() tooltipPos: string = 'left';
  @Input() styleClass: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
