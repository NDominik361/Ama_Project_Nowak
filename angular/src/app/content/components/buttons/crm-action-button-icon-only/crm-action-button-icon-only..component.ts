import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-action-button-icon-only',
  templateUrl: './crm-action-button-icon-only.component.html',
  styleUrls: ['./crm-action-button-icon-only.component.scss']
})
export class CrmActionButtonIconOnlyComponent extends AbstractButton implements OnInit {
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
