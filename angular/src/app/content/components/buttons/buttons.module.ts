import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrmNavigationButtonComponent} from './crm-navigation-button/crm-navigation-button.component';
import {CrmDetailButtonComponent} from './crm-detail-button/crm-detail-button.component';
import {CrmCancelButtonComponent} from './crm-cancel-button/crm-cancel-button.component';
import {CrmDeleteButtonComponent} from './crm-delete-button/crm-delete-button.component';
import {PrimeNgComponentsModule} from 'src/app/common/module/prime-ng-components.module';
import {StyleClassModule} from 'primeng/styleclass';
import {CrmNewButtonComponent} from './crm-new-button/crm-new-button.component';
import {CrmActionButtonComponent} from './crm-action-button/crm-action-button.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CrmActionButtonIconOnlyComponent} from './crm-action-button-icon-only/crm-action-button-icon-only..component';
import {CrmSmallNavigationButtonComponent} from './crm-small-navigation-button/crm-small-navigation-button.component';
import {
  CrmNavigationButtonIconOnlyComponent
} from './crm-navigation-button-icon-only/crm-navigation-button-icon-only.component';


@NgModule({
  declarations: [
    CrmNavigationButtonComponent,
    CrmDeleteButtonComponent,
    CrmCancelButtonComponent,
    CrmActionButtonComponent,
    CrmDetailButtonComponent,
    CrmNewButtonComponent,
    CrmSmallNavigationButtonComponent,
    CrmActionButtonIconOnlyComponent,
    CrmNavigationButtonIconOnlyComponent

  ],
  imports: [
    CommonModule,
    PrimeNgComponentsModule,
    FontAwesomeModule,
    StyleClassModule
  ],
  exports: [
    CrmNavigationButtonComponent,
    CrmActionButtonComponent,
    CrmDeleteButtonComponent,
    CrmCancelButtonComponent,
    CrmSmallNavigationButtonComponent,
    CrmDetailButtonComponent,
    CrmNewButtonComponent,
    CrmActionButtonIconOnlyComponent,
    CrmNavigationButtonIconOnlyComponent

  ]
})
export class ButtonsModule {
}
