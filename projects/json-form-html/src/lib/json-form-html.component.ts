import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  EventEmitter,
  Output,
  Inject,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DOCUMENT } from '@angular/common';


export interface JsonFormControlOptions {
  minlength?: any;
  maxlength?: any;
  step?: any;
  icon?: any;
  class?: any;
  div_id?: any;
  name?: any;
  placeholder?: any;
  id?: any;
  required?: boolean;
  disabled?: boolean;
  dynamic?: [{}, {}];
  audit?: any;
  disableRipple?: any;
  link?: any;
  color?: any;
  operation?: any;
  multiple?: any;
  hidden?: any;
  autocomplete?: any;
  changes?: any;
  max?: any;
  min?: any;
  autofocus?: any;
  style?: any;
  pattern?: any;
  readonly?: any;
  appearance?: any;
  title?: any;
  accept?: any;
  checked?: any;
}

export interface JsonFormControls {
  subForm?: JsonFormControls[];
  formName?: any;
  ctrl_name: any;
  label?: any;
  value?: any;
  values?: any;
  type?: any;
  options?: JsonFormControlOptions;
  class?: any;
  validators: any;
  buttonName?: any;
  buttonType?: any;
  master?: any;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}

@Component({
  selector: 'lib-json-form-html',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <section class="row mb-3">
    <div [class]="control?.class" [id]="control.options?.div_id"
      [ngShow]="control?.master ? formControls[control?.master].value : true" *ngFor="let control of buildForm"
      style="list-style-type: none;">
      <!-- {{ control.master }} -->
      <!-- Labels -->
      <div *ngIf="control.label != '' && control.formName == 'formElement'">
        <label><span *ngIf="control.options?.required" class="asterisk">*</span>{{ control.label }}</label>
      </div>

      <!-- All Input types -->
      <div *ngIf="control.formName == 'formElement'">
        <input *ngIf="['text','password','email','number','search','tel','url','date','time','file'].includes(control.type)"
          [type]="control.type" [formControlName]="control.ctrl_name" [value]="control.value" [id]="control.options?.id"
          [title]="control.options?.title" [min]="control.options?.min" [max]="control.options?.max"
          [placeholder]="control.options?.placeholder" [maxlength]="control.options?.maxlength"
          [minlength]="control.options?.minlength" [pattern]="control.options?.pattern"
          [ngStyle]="control.options?.style" [ngClass]="control.options?.class" [readonly]="control.options?.readonly"
          [autofocus]="control.options?.autofocus" [autocomplete]="control.options?.autocomplete"
          [hidden]="control.options?.hidden" [accept]="control.options?.accept" [multiple]="control.options?.multiple"
          (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" 
          ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">

        <!-- checkbox -->
        <input *ngIf=" control.type === 'checkbox'" type="checkbox" formControlName="{{control.ctrl_name}}"
          [value]="control.value" [checked]="control.options?.checked" [title]="control.options?.title"
          [id]="control.options?.id" [min]="control.options?.min" [max]="control.options?.max"
          [placeholder]="control.options?.placeholder" [maxlength]="control.options?.maxlength"
          [minlength]="control.options?.minlength" [pattern]="control.options?.pattern"
          [ngStyle]="control.options?.style" [ngClass]="control.options?.class" [readonly]="control.options?.readonly"
          [autofocus]="control.options?.autofocus" [autocomplete]="control.options?.autocomplete"
          [hidden]="control.options?.hidden" [accept]="control.options?.accept" [multiple]="control.options?.multiple"
          (change)="control.options?.changes ? formChanges(control.ctrl_name) : null"
          ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)"
          >
          

        <!-- Radio buttons -->
        <div *ngIf="control.type === 'radio'">
          <div *ngFor="let value of control.values">
            <label>{{value}}</label> &nbsp;
            <input type="radio" [formControlName]="control.ctrl_name" [value]="value" [title]="control.options?.title"
              [id]="control.options?.id" [min]="control.options?.min" [max]="control.options?.max"
              [placeholder]="control.options?.placeholder" [maxlength]="control.options?.maxlength"
              [minlength]="control.options?.minlength" [pattern]="control.options?.pattern"
              [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
              [readonly]="control.options?.readonly" [autofocus]="control.options?.autofocus"
              [autocomplete]="control.options?.autocomplete" [hidden]="control.options?.hidden"
              [accept]="control.options?.accept" [multiple]="control.options?.multiple" (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" 
              ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">
          </div>
        </div>

        <!-- Drop Down selector -->
        <select *ngIf="control.type === 'dropdown'" [formControlName]="control.ctrl_name" [value]="control.value"
          [id]="control.options?.id" [title]="control.options?.title"
          [maxlength]="control.options?.maxlength" [minlength]="control.options?.minlength"
          [pattern]="control.options?.pattern" [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
          [autofocus]="control.options?.autofocus"
          [autocomplete]="control.options?.autocomplete" [hidden]="control.options?.hidden" (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" 
          ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">
          <option *ngFor="let opt of control.values" [attr.value]="opt.key" [selected]="opt.select">{{opt.value}}
          </option>
        </select>

        <!-- Textarea -->
        <textarea *ngIf="control.type === 'textarea'" [formControlName]="control.ctrl_name" [value]="control?.value"
          [id]="control.options?.id" [title]="control.options?.title" [placeholder]="control.options?.placeholder"
          [maxlength]="control.options?.maxlength" [minlength]="control.options?.minlength"
          [pattern]="control.options?.pattern" [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
          [readonly]="control.options?.readonly" [autofocus]="control.options?.autofocus"
          [autocomplete]="control.options?.autocomplete" [hidden]="control.options?.hidden" (change)="control.options?.changes ? formChanges(control.ctrl_name) : null"
          ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)"
          >
          </textarea>

        <!-- Error message for input fields -->
        <div *ngIf="formControls[control.ctrl_name].errors && !formControls[control.ctrl_name].pristine">
          <span class="error-message">{{ getErrorMessage(formControls[control.ctrl_name])}}</span>
        </div>

      </div>

      <!-- subForm -->
      <!-- template call-->
      <div *ngIf="control.formName == 'subForm'">
        <ng-container [ngTemplateOutlet]="template"
          [ngTemplateOutletContext]="{subForm: control.subForm, my_form_group: control.ctrl_name}"></ng-container>
      </div>

      <br>

      <ng-container *ngIf="control.formName == 'button'" >
        <!-- {{control.formName}}{{control.buttonType}} -->

        <!-- buttons without linking -->
        <button *ngIf="control.buttonName == 'button' && control.buttonType != 'reset'" [ngClass]="control.options?.class" [type]="control.buttonType" [disabled]="control.options?.disabled ? !formName.valid : null" ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">
          {{control.label}}
        </button>
        
        <a *ngIf="control.buttonName == 'link'" [href]="control.options?.link" target="_blank" ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">{{control.label}}</a>
       </ng-container>

    </div>
    <br>
  </section>



  <!-- template for subform -->
  <ng-template #template let-template="subForm" let-my_formGroup="my_form_group">
    <!-- {{my_formGroup}} -->
    <div [formGroupName]="my_formGroup">
      <!-- {{my_formGroup}} -->
      <div [class]="subcontrol?.class" 
        [id]="subcontrol.options?.id" *ngFor="let subcontrol of template">
        <!-- same logic as above for each subform control -->
        <div *ngIf="subcontrol.label !== ''">
          <label><span *ngIf="subcontrol.options?.required" class="asterisk">*</span>{{ subcontrol.label }}</label>
        </div>
        <!-- {{subcontrol.ctrl_name}}  -->

        <!-- All Input types -->
        <div *ngIf="subcontrol.formName == 'formElement'">
          <input
            *ngIf="['text','password','email','number','search','tel','url','date','time','file'].includes(subcontrol.type)"
            [type]="subcontrol.type" [formControlName]="subcontrol.ctrl_name" [value]="subcontrol.value"
            [title]="subcontrol.options?.title" [min]="subcontrol.options?.min" [max]="subcontrol.options?.max"
            [placeholder]="subcontrol.options?.placeholder" [maxlength]="subcontrol.options?.maxlength"
            [minlength]="subcontrol.options?.minlength" [pattern]="subcontrol.options?.pattern"
            [style]="subcontrol.options?.style" [ngClass]="subcontrol.options?.class"
            [readonly]="subcontrol.options?.readonly" [autofocus]="subcontrol.options?.autofocus"
            [autocomplete]="subcontrol.options?.autocomplete" (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.ctrl_name,$event)"
            [hidden]="subcontrol.options?.hidden" [accept]="subcontrol.options?.accept"
            [multiple]="subcontrol.options?.multiple">

          <!-- checkbox -->
          <input *ngIf=" subcontrol.type === 'checkbox'" type="checkbox" formControlName="{{subcontrol.ctrl_name}}"
            [value]="subcontrol.value" [checked]="subcontrol.options?.checked" [title]="subcontrol.options?.title"
            [id]="subcontrol.options?.id" [min]="subcontrol.options?.min" [max]="subcontrol.options?.max"
            [placeholder]="subcontrol.options?.placeholder" [maxlength]="subcontrol.options?.maxlength"
            [minlength]="subcontrol.options?.minlength" [pattern]="subcontrol.options?.pattern"
            [ngStyle]="subcontrol.options?.style" [ngClass]="subcontrol.options?.class"
            [readonly]="subcontrol.options?.readonly" [autofocus]="subcontrol.options?.autofocus"
            [autocomplete]="subcontrol.options?.autocomplete" [hidden]="subcontrol.options?.hidden"
            [accept]="subcontrol.options?.accept" [multiple]="subcontrol.options?.multiple"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">

          <!-- Radio buttons -->
          <div *ngIf="subcontrol.type === 'radio'">
            <div *ngFor="let value of subcontrol.values">
              <label>{{value}}</label> &nbsp;
              <input type="radio" [formControlName]="subcontrol.ctrl_name" [value]="subcontrol.value"
                [title]="subcontrol.options?.title" [id]="subcontrol.options?.id" [min]="subcontrol.options?.min"
                [max]="subcontrol.options?.max" [placeholder]="subcontrol.options?.placeholder"
                [maxlength]="subcontrol.options?.maxlength" [minlength]="subcontrol.options?.minlength"
                [pattern]="subcontrol.options?.pattern" [ngStyle]="subcontrol.options?.style"
                [ngClass]="subcontrol.options?.class" [readonly]="subcontrol.options?.readonly"
                [autofocus]="subcontrol.options?.autofocus" [autocomplete]="subcontrol.options?.autocomplete"
                [hidden]="subcontrol.options?.hidden" [accept]="subcontrol.options?.accept"
                [multiple]="subcontrol.options?.multiple" (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
                (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            </div>
          </div>

          <!-- Drop Down selector -->
          <select *ngIf="subcontrol.type === 'dropdown'" [formControlName]="subcontrol.ctrl_name" [value]="subcontrol.value"
            [id]="subcontrol.options?.id" [title]="subcontrol.options?.title"
            [maxlength]="subcontrol.options?.maxlength" [minlength]="subcontrol.options?.minlength"
            [pattern]="subcontrol.options?.pattern" [ngStyle]="subcontrol.options?.style"
            [ngClass]="subcontrol.options?.class" 
            [autofocus]="subcontrol.options?.autofocus" [autocomplete]="subcontrol.options?.autocomplete"
            [hidden]="subcontrol.options?.hidden" 
            [multiple]="subcontrol.options?.multiple" (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            <option *ngFor="let opt of subcontrol.values" [attr.value]="opt.key" [selected]="opt.select">{{opt.value}}
            </option>
          </select>

          <!-- Textarea -->
          <textarea *ngIf="subcontrol.type === 'textarea'" [formControlName]="subcontrol.ctrl_name"
            [value]="subcontrol?.value" [id]="subcontrol.options?.id" [title]="subcontrol.options?.title"
            [placeholder]="subcontrol.options?.placeholder" [maxlength]="subcontrol.options?.maxlength"
            [minlength]="subcontrol.options?.minlength" [pattern]="subcontrol.options?.pattern"
            [ngStyle]="subcontrol.options?.style" [ngClass]="subcontrol.options?.class" [autofocus]="subcontrol.options?.autofocus"
            [autocomplete]="subcontrol.options?.autocomplete" [hidden]="subcontrol.options?.hidden" (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            </textarea>

          <!-- Error message for input fields -->
          <!-- {{formControls[my_formGroup].controls[subcontrol.ctrl_name].errors}} -->
          <div *ngIf="formControls[my_formGroup].controls[subcontrol.ctrl_name].errors">
              <span class="error-message">{{ getErrorMessage(formControls[my_formGroup].controls[subcontrol.ctrl_name])}}</span>
          </div>

        </div>

        <ng-container *ngIf="subcontrol.formName == 'button'" >
          <!-- {{control.formName}}{{control.buttonType}} -->
  
          <!-- buttons without linking -->
          <button *ngIf="subcontrol.buttonName == 'button'" [ngClass]="subcontrol.options?.class" [type]="subcontrol?.buttonType" [disabled]="subcontrol.options?.disabled ? !formName.valid : null" ngEvent (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            {{subcontrol.label}}
          </button>
  
          <a *ngIf="subcontrol.buttonName == 'link'" [href]="subcontrol.options?.link" target="_blank" ngEvent (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">{{subcontrol.label}}</a>
         </ng-container>

        <!-- multiple subnest -->
        <!-- <div *ngIf="subcontrol.formName == 'subForm'">
                <div  [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{subForm: subcontrol?.subForm, my_form_group: subcontrol?.ctrl_name}"></div>
            </div> -->

      </div>
    </div>
  </ng-template>
</form>

<style>
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
  `,
  styles: [
  ]
})
export class JsonFormHtmlComponent {
//inputs
@Input() jsonFormData: any;
@Input() customValidators: any;

constructor(private fb: FormBuilder, @Inject(DOCUMENT) document: Document) {}

public myForm: FormGroup = this.fb.group({});
public buildForm!: JsonFormControls[];

//event emitters
@Output() allEvents = new EventEmitter<any>();

//init function
ngOnChanges(changes: SimpleChanges) {
  if (!changes['jsonFormData'].firstChange && this.jsonFormData) {
    this.myForm = this.createForm(this.jsonFormData.controls);
  }
  if (this.jsonFormData) this.buildForm = this.jsonFormData.controls;
}

//dynamic form creation
createForm(controls: JsonFormControls[]) {
  const form: FormGroup = this.fb.group({});
  for (const control of controls) {
    const validators: any = [];
    if (control.formName == 'formElement') {
      Object.entries(control.validators).forEach(
        ([key, val]: any, index: any) => {
          const dict = control.validators[key];
          if (
            [
              'min',
              'max',
              'required',
              'email',
              'minLength',
              'maxLength',
              'pattern',
              'nullValidator',
            ].includes(val)
          ) {
            switch (val) {
              case 'min': {
                validators.push(Validators.min(val));
                break;
              }
              case 'max': {
                validators.push(Validators.max(val));
                break;
              }
              case 'minLength': {
                validators.push(Validators.minLength(val));
                break;
              }
              case 'maxLength': {
                validators.push(Validators.maxLength(val));
                break;
              }
              case 'pattern': {
                validators.push(Validators.pattern(val));
                break;
              }
              case 'email': {
                validators.push(Validators.email);
                break;
              }
              case 'required': {
                validators.push(Validators.required);
                break;
              }
              case 'nullValidator': {
                validators.push(Validators.nullValidator);
                break;
              }
            }
          } else {
            if (this.customValidators)
              if (Object.keys(this.customValidators).includes(val)) {
                validators.push(this.customValidators[val]);
              }
          }
        }
      );

      if (validators.length > 0) {
        form.addControl(
          control.ctrl_name,
          this.fb.control(control.value, validators)
        );
      } else if (validators.length == 0) {
        form.addControl(control.ctrl_name, this.fb.control(control.value));
      }
    } else if (
      control.formName == 'subForm' ||
      control.formName == 'expansionPanel'
    ) {
      if (control.subForm)
        form.addControl(control.ctrl_name, this.createForm(control.subForm));
    } else if (control.formName == 'formArray') {
      const formArray = this.fb.array([]);
      if (control.subForm && Array.isArray(control.subForm)) {
        formArray.push(this.createForm(control.subForm) as any);
      }
      form.addControl(control.ctrl_name, formArray);
    }
  }
  return form;
}

onSubmit() {
  this.allEvents.emit({"form":this.myForm, "event":"submit"})
}

//date range setter function
setDateRange(dateString: any): Date {
  if (dateString == 'today') return new Date();
  const temp = new Date(dateString);
  return temp;
}

//on reset function
onReset() {
  this.allEvents.emit({"form":this.myForm, "event":"reset"})
}

//testing
test(data: any) {
  console.log('test', data);
}

//getters for html validation checks
get formControls() {
  return this.myForm.controls as any;
}

get formName() {
  return this.myForm;
}

// return custom error
getErrorMessage(controlName: any) {
  if(controlName.errors?.errMsg) return controlName.errors?.errMsg;
  else{
    if(controlName.errors?.['minlength']) return "Minimum length criteria not met";
    if(controlName.errors?.['required']) return "This is a required field";
    if(controlName.errors?.['maxlength']) return "Maximum length criteria not met";
    if(controlName.errors?.['email']) return "email not valid";
    if(controlName.errors?.['pattern']) return "invalid input";
    if(controlName.errors?.['min']) return "Minimum value criteria not met";
    if(controlName.errors?.['max']) return "Maximum value criteria not met";
    if(controlName.errors?.['nullValidator']) return "NULL detected";
  }
}

//emit changes in form
formChanges(name: any): void {
  console.log("form changes");
  this.allEvents.emit({"form":this.myForm, "event":"changes","emitter": name, "controls":this.formControls})
}

//button event emitter
onEvent(name: any, event: any): void  {
  console.log("test events");
  this.allEvents.emit({"form":this.myForm, "event":event, "emitter":name, "controls":this.formControls})
}

changeValidity(ctrl: any, val: any) {

  // remove validators and hide 
  if (this.formControls[ctrl].dirty) {
    val.forEach(({ ctrl, validator, id }: any) => {
      this.formControls[ctrl].disable();
    });
  } else {
    // remove validators and hide auditInfo fields
    val.forEach(({ ctrl, validator, id }: any) => {
      this.formControls[ctrl].enable();
    });
  }
}
}
