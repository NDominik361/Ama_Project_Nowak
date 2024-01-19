import {Component, Input, OnInit} from '@angular/core';
import {AbstractButton} from '../AbstractButton';
import {IconDefinition} from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'crm-small-navigation-button',
  templateUrl: './crm-small-navigation-button.component.html',
  styleUrls: ['./crm-small-navigation-button.component.scss']
})
export class CrmSmallNavigationButtonComponent extends AbstractButton implements OnInit {
  @Input() label: string = 'Zurück';
  @Input() icon: string = 'fa fa-arrow-left';
  @Input() iconPos: any = 'left';
  @Input() styleClass: string;
  @Input() iconFa: IconDefinition;
  @Input() tooltipText: string = 'Navigation';
  @Input() tooltipPos: string = 'left';


  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
