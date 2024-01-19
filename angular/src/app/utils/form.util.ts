import {AbstractControl, UntypedFormArray, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ConfirmationService} from "primeng/api";

export class FormUtil {

  // To be used together with the file uploader
  // Files will be under their own name (formgroup key) as multipart file[], all other properties will be in one object under the 'properties' key
  static toFormData<T>(formValue: T): FormData {
    const formData = new FormData();
    const properties = {};


    formData.append('properties', JSON.stringify(properties));

    return formData;
  }

  // The same way gmail does it as per https://stackoverflow.com/questions/15180173/convert-html-to-plain-text-in-js-without-browser-environment/15180206
  static htmlToText(html: string): string {
    if (html) {
      html = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
      html = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
      html = html.replace(/<\/div>/ig, '\n');
      html = html.replace(/<\/li>/ig, '\n');
      html = html.replace(/<li>/ig, '  *  ');
      html = html.replace(/<\/ul>/ig, '\n');
      html = html.replace(/<\/p>/ig, '\n');
      html = html.replace(/&nbsp;/ig, ' ');
      html = html.replace(/<br\s*[\/]?>/gi, '\n');
      html = html.replace(/<[^>]+>/ig, '');
    }

    return html;
  }

  static guardModifications(form: UntypedFormGroup, fieldNames: string[], confirmationService: ConfirmationService, accept: Function, reject?: Function): void {
    if (
      fieldNames && fieldNames.some(name => form.controls[name].dirty)
        ||
      !fieldNames && form.dirty)
    {
      confirmationService.confirm({
        key: 'crmtool_email-templates_confirm_modification_guard',
        message: 'Alle nicht gespeicherten Änderungen gehen verloren!',
        header: 'Achtung',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Fortfahren',
        rejectLabel: 'Zurück',
        acceptIcon: 'pi pi-check',
        rejectIcon: 'pi pi-times',
        accept: () => {
          accept();
        },
        reject: () => {
          reject();
        }
      });
    } else {
      accept();
    }
  }

  // When you want to activate the invalid (red border) flag on inputs
  static markFormControlsAsTouchedAndDirty(form: UntypedFormGroup): void {
    Object.values(form.controls)
      .forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      })
  }

  static formGroupOfAbstractControl(control: AbstractControl): UntypedFormGroup {
    return control as UntypedFormGroup;
  }

  static getPlaceholdersFromText(text: string): string[] {
    return text.match(/{{[^}}]+}}/g);
  }

  static formControlOfAbstractControl(control: AbstractControl): UntypedFormControl {
    return control as UntypedFormControl;
  }

  static formArrayOfAbsctractControl(control: AbstractControl): UntypedFormArray {
    return control as UntypedFormArray;
  }

  static validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  static markAsUntouched(formGroup: UntypedFormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsUntouched({onlySelf: true});
        control.markAsPristine({onlySelf: true});
      } else if (control instanceof UntypedFormGroup) {
        this.markAsUntouched(control);
      }
    });
  }

  static removeValidatorsFromFormgroup(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        let formControl = (control as UntypedFormControl);
        formControl.clearValidators()
        formControl.updateValueAndValidity();
      } else if (control instanceof UntypedFormGroup) {
        this.removeValidatorsFromFormgroup(control);
      }
    });
    formGroup.clearValidators();
    formGroup.updateValueAndValidity();
  }

  static clearAutocompleteFields(...selectors: string[]) {
    if (selectors){
      selectors.forEach(s => {
        //delete the input field value of the autocomplete, else it is filled from previous edit
        let element: any = document.querySelector(`${s} input`);
        if (element) element.value = "";
      })
    }
  }
}
