import {Directive, EventEmitter, Input, Output} from '@angular/core';

@Directive()
export class AbstractButton {
  @Input()
  disabled: any = false;
}
