import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavComponent} from './sidenav.component';
import {AppRoutingModule} from '../../../app-routing.module';

@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
    exports: [
        SidenavComponent,
    ],
  bootstrap: []
})
export class SidenavModule { }

