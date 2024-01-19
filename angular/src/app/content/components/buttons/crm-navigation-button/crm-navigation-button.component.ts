import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-navigation-button',
  templateUrl: './crm-navigation-button.component.html',
  styleUrls: ['./crm-navigation-button.component.scss']
})
export class CrmNavigationButtonComponent extends AbstractButton implements OnInit {
  @Input() label: string = 'Zurück';
  @Input() icon: string = 'fa fa-arrow-left';
  @Input() iconPos: any = 'left';
  @Input() styleClass: string;
  @Input() iconFa: IconDefinition;
  @Input() tooltipText: string = '';
  @Input() tooltipPos: string = 'left';


  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
