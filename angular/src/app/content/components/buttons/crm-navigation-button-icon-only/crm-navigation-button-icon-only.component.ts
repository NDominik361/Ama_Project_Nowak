import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-navigation-button-icon-only',
  templateUrl: './crm-navigation-button-icon-only.component.html',
  styleUrls: ['./crm-navigation-button-icon-only.component.scss']
})
export class CrmNavigationButtonIconOnlyComponent extends AbstractButton implements OnInit {
  @Input() icon: string = 'fa fa-arrow-circle-right';
  @Input() iconPos: any = 'left';
  @Input() styleClass: string;
  @Input() iconFa: IconDefinition;
  @Input() pTooltip: string = 'Detailansicht Öffnen';
  @Input() tooltipPos: string = 'left';


  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
