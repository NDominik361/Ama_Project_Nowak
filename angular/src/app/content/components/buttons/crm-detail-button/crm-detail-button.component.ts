import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-detail-button',
  templateUrl: './crm-detail-button.component.html',
  styleUrls: ['./crm-detail-button.component.scss']
})
export class CrmDetailButtonComponent extends AbstractButton implements OnInit {
  @Input() icon: string = 'fa fa-arrow-circle-right fa-lg';
  @Input() iconPos: any = 'right';
  @Input() styleClass: string;
  @Input() iconFa: IconDefinition;
  @Input() tooltipText: any = 'Detailansicht Öffnen';
  @Input() tooltipPos: any = 'left';


  constructor() {
    super();
  }


  ngOnInit(): void {
  }

}
