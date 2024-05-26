import {
  Component,
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
  selector: 'lib-json-form-mat',
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
  <section class="row mb-3">
    <div [class]="control?.class" [id]="control.options?.id"
      [ngShow]="control?.master ? formControls[control?.master].value : true" *ngFor="let control of buildForm"
      style="list-style-type: none">

      <!-- Labels -->
      <div *ngIf="control.label != '' && control.formName == 'formElement'">
        <mat-label class=""><span *ngIf="control.options?.required" class="asterisk">*</span>{{ control.label
          }}</mat-label>
      </div>

      <!-- All Input types -->
      <ng-container *ngIf="control.type == 'file'">
        <input [type]="control.type" [formControlName]="control.ctrl_name" [value]="control.value"
          [id]="control.options?.id" [title]="control.options?.title" [min]="control.options?.min" [disabled]="true"
          [max]="control.options?.max" [placeholder]="control.options?.placeholder"
          [maxlength]="control.options?.maxlength" [minlength]="control.options?.minlength"
          [pattern]="control.options?.pattern" [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
          [readonly]="control.options?.readonly" [autofocus]="control.options?.autofocus"
          [autocomplete]="control.options?.autocomplete" [hidden]="control.options?.hidden"
          [accept]="control.options?.accept" [multiple]="control.options?.multiple"
          (change)="control.options?.changes ? formChanges(control.ctrl_name) : null">
      </ng-container>
      <div *ngIf="control.formName == 'formElement'">
        <ng-container *ngIf="
            [
              'text',
              'password',
              'email',
              'number',
              'search',
              'tel',
              'url',
              'time'
            ].includes(control.type)
          ">
          <mat-form-field [appearance]="control.options?.appearance" [style]="control.options?.style">
            <input matInput [type]="control.type" [formControlName]="control.ctrl_name" [value]="control.value"
              [id]="control.options?.id" [title]="control.options?.title" [min]="control.options?.min" [disabled]="true"
              [max]="control.options?.max" [placeholder]="control.options?.placeholder"
              [maxlength]="control.options?.maxlength" [minlength]="control.options?.minlength"
              [pattern]="control.options?.pattern" [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
              [readonly]="control.options?.readonly" [autofocus]="control.options?.autofocus"
              [autocomplete]="control.options?.autocomplete" [hidden]="control.options?.hidden"
              [accept]="control.options?.accept" [multiple]="control.options?.multiple"
              (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(control.ctrl_name,$event)" />
          </mat-form-field>
        </ng-container>

        <!-- checkbox -->
        <ng-container *ngIf="control.type === 'checkbox'">
          <mat-checkbox formControlName="{{ control.ctrl_name }}" [value]="control.value"
            [checked]="control.options?.checked" [title]="control.options?.title" [id]="control.options?.id"
            [ngStyle]="control.options?.style" [ngClass]="control.options?.class"
            (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" 
            ngEvent (ngEvent)="onEvent(control.ctrl_name,$event)">
          </mat-checkbox>
        </ng-container>

        <!-- Radio buttons -->
        <ng-container *ngIf="control.type === 'radio'">
          <mat-radio-group [formControlName]="control.ctrl_name">
            <mat-radio-button *ngFor="let value of control.values" [value]="value" [class]="control.options?.class"
              (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(control.ctrl_name,$event)">
              <mat-label>{{ value }}</mat-label>
            </mat-radio-button>
          </mat-radio-group>
        </ng-container>

        <!-- Date Picker -->
        <mat-form-field *ngIf="control.type == 'date'" [appearance]="control.options?.appearance"
          [style]="control.options?.style">
          <mat-label>Choose a date</mat-label>
          <input matInput [matDatepicker]="picker" [formControlName]="control.ctrl_name"
            [max]="setDateRange(control.options?.max)" [min]="setDateRange(control.options?.min)"
            (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
            (ngEvent)="onEvent(control.ctrl_name,$event)" />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-error *ngIf="
            formControls[control.ctrl_name]?.errors &&
            !formControls[control.ctrl_name].pristine
          ">
          {{ getErrorMessage(control.ctrl_name) }}
        </mat-error>

        <!-- Drop Down selector -->
        <ng-container *ngIf="control.type === 'dropdown'">
          <mat-form-field [style]="control.options?.style">
            <mat-label>{{ control.label }}</mat-label>
            <mat-select [formControlName]="control.ctrl_name" [multiple]="control.options?.multiple"
              (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(control.ctrl_name,$event)">
              <mat-option *ngFor="let opt of control.values" [value]="opt.key">
                {{ opt.key }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </ng-container>

        <!-- Textarea -->
        <ng-container *ngIf="control.type == 'textarea'">
          <mat-form-field [style]="control.options?.style">
            <textarea matInput *ngIf="control.type === 'textarea'" [formControlName]="control.ctrl_name"
              [value]="control?.value" [id]="control.options?.id" [title]="control.options?.title"
              [placeholder]="control.options?.placeholder" [maxlength]="control.options?.maxlength"
              [minlength]="control.options?.minlength" [ngStyle]="control.options?.style"
              [ngClass]="control.options?.class" (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(control.ctrl_name,$event)">
            </textarea>
          </mat-form-field>
        </ng-container>

        <!-- Error message for input fields -->
        <br />
        <ng-container *ngIf="
            formControls[control.ctrl_name]?.errors &&
            !formControls[control.ctrl_name].pristine
          ">
          <mat-error>{{
            getErrorMessage(formControls[control.ctrl_name])
            }}</mat-error>
        </ng-container>

      </div>

      <!-- expansion panel -->
      <ng-container *ngIf="control.formName == 'expansionPanel'">
        <ng-container *ngIf="control.type == 'expansion'">
          <mat-expansion-panel>
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{control.label}}
              </mat-panel-title>
              <mat-panel-description>
                {{control.value}}
              </mat-panel-description>
            </mat-expansion-panel-header>
            <!-- template call-->
            <ng-container [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{
                subForm: control.subForm,
                my_form_group: control.ctrl_name
              }"></ng-container>

          </mat-expansion-panel>
        </ng-container>
      </ng-container>

      <!-- subForm -->
      <!-- template call-->
      <div *ngIf="control.formName == 'subForm'">
        <ng-container [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{
            subForm: control.subForm,
            my_form_group: control.ctrl_name
          }"></ng-container>
      </div>
      <br>

      <ng-container *ngIf="control.formName == 'button'">
        <!-- buttons without linking -->
        <button *ngIf="control.buttonName == 'buttonRaised'" [ngClass]="control.options?.class"
          [type]="control?.buttonType" [disabled]="control.options?.disabled ? control.buttonType == 'reset' ? !formName.dirty : !formName.valid : null"
          [color]="control.options?.color" [disableRipple]="control.options?.disableRipple"
          (change)="control.options?.changes ? formChanges(control.options?.operation) : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)" mat-raised-button>
          {{ control.label }}
        </button>

        <button *ngIf="control.buttonName == 'buttonStroked'" [type]="control?.buttonType" [ngClass]="control.options?.class"
        [disabled]="control.options?.disabled ? control.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" [color]="control.options?.color"
          [disableRipple]="control.options?.disableRipple" (change)="control.options?.changes ? formChanges(control.options?.operation) : null"
          ngEvent (ngEvent)="onEvent(control.options?.operation,$event)" mat-stroked-button>
          {{ control.label }}
        </button>

        <button *ngIf="control.buttonName == 'buttonFlat'" [type]="control?.buttonType" [ngClass]="control.options?.class"
        [disabled]="control.options?.disabled ? control.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)" [color]="control.options?.color"
          [disableRipple]="control.options?.disableRipple" (change)="control.options?.changes ? formChanges(control.options?.operation) : null"
          mat-flat-button>
          {{ control.label }}
        </button>

        <button *ngIf="control.buttonName == 'buttonSimple'" [type]="control?.buttonType" [ngClass]="control.options?.class"
        [disabled]="control.options?.disabled ? control.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)" [color]="control.options?.color"
          [disableRipple]="control.options?.disableRipple" (change)="control.options?.changes ? formChanges(control.options?.operation) : null"
          mat-button>
          {{ control.label }}
        </button>

        <a *ngIf="control.buttonName == 'link'" mat-button [href]="control.options?.link" target="_blank" [ngClass]="control.options?.class"
          [disableRipple]="control.options?.disableRipple" [color]="control.options?.color"
          (change)="control.options?.changes ? formChanges(control.options?.operation) : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)">{{ control.label }}</a>

        <a *ngIf="control.buttonName == 'linkRaised'" mat-raised-button [href]="control.options?.link" target="_blank" [ngClass]="control.options?.class"
          [disableRipple]="control.options?.disableRipple" [color]="control.options?.color"
          (change)="control.options?.changes ? formChanges(control.options?.operation) : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)">{{ control.label }}</a>

        <a *ngIf="control.buttonName == 'linkStroked'" mat-stroked-button [href]="control.options?.link" target="_blank" [ngClass]="control.options?.class"
          [disableRipple]="control.options?.disableRipple" [color]="control.options?.color"
          (change)="control.options?.changes ? formChanges(control.options?.operation) : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)">{{ control.label }}</a>

        <a *ngIf="control.buttonName == 'linkFlat'" mat-flat-button [href]="control.options?.link" target="_blank" [ngClass]="control.options?.class"
          [disableRipple]="control.options?.disableRipple" [color]="control.options?.color"
          (change)="control.options?.changes ? formChanges(control.ctrl_name) : null" ngEvent
          (ngEvent)="onEvent(control.options?.operation,$event)">{{ control.label }}</a>
      </ng-container>
    </div>
    <br />
  </section>

  <!-- template for subform -->
  <ng-template #template let-template="subForm" let-my_formGroup="my_form_group">
    <!-- {{my_formGroup}} -->
    <div [formGroupName]="my_formGroup">
      <!-- {{my_formGroup}} -->
      <div [class]="subcontrol?.class" [id]="subcontrol.options?.id" *ngFor="let subcontrol of template">
        <!-- same logic as above for each subform control -->
        <div *ngIf="subcontrol.label !== ''">
          <label><span *ngIf="subcontrol.options?.required" class="asterisk">*</span>{{ subcontrol.label }}</label>
        </div>
        <!-- All Input types -->
        <div *ngIf="subcontrol.formName == 'formElement'">
          <ng-container *ngIf="
              [
                'text',
                'password',
                'email',
                'number',
                'search',
                'tel',
                'url',
                'time'
              ].includes(subcontrol.type)
            ">
            <mat-form-field [appearance]="subcontrol.options?.appearance" [style]="subcontrol.options?.style">
              <input matInput [type]="subcontrol.type" [formControlName]="subcontrol.ctrl_name"
                [value]="subcontrol.value" [title]="subcontrol.options?.title" [min]="subcontrol.options?.min"
                [max]="subcontrol.options?.max" [placeholder]="subcontrol.options?.placeholder"
                [maxlength]="subcontrol.options?.maxlength" [minlength]="subcontrol.options?.minlength"
                [pattern]="subcontrol.options?.pattern" [style]="subcontrol.options?.style"
                [ngClass]="subcontrol.options?.class" [readonly]="subcontrol.options?.readonly"
                [autofocus]="subcontrol.options?.autofocus" [autocomplete]="subcontrol.options?.autocomplete"
                (change)="(subcontrol.options?.change)" [hidden]="subcontrol.options?.hidden"
                [accept]="subcontrol.options?.accept" [multiple]="subcontrol.options?.multiple"
                (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
                (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            </mat-form-field>
          </ng-container>
          <!-- datepicker -->
          <mat-form-field *ngIf="subcontrol.type == 'date'" [appearance]="subcontrol.options?.appearance"
            [style]="subcontrol.options?.style">
            <mat-label>Choose a date</mat-label>
            <input matInput [matDatepicker]="picker" [formControlName]="subcontrol.ctrl_name"
              [max]="setDateRange(subcontrol.options?.max)" [min]="setDateRange(subcontrol.options?.min)"
              (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(subcontrol.ctrl_name,$event)" />
            <mat-hint>MM/DD/YYYY</mat-hint>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>

          <!-- checkbox -->
          <ng-container *ngIf="subcontrol.type === 'checkbox'">
            <mat-checkbox [formControlName]="subcontrol.ctrl_name" [value]="subcontrol.value"
              [checked]="subcontrol.options?.checked" [title]="subcontrol.options?.title" [id]="subcontrol.options?.id"
              [ngStyle]="subcontrol.options?.style" [ngClass]="subcontrol.options?.class"
              (change)="subcontrol.options?.formchanges ? formChanges(subcontrol.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
            </mat-checkbox>
          </ng-container>

          <!-- Radio buttons -->
          <ng-container *ngIf="subcontrol.type === 'radio'">
            <mat-radio-group [formControlName]="subcontrol.ctrl_name"
              (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
              (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
              <mat-radio-button *ngFor="let value of subcontrol.values" [value]="value">
                <mat-label>{{ value }}</mat-label>
              </mat-radio-button>
            </mat-radio-group>
          </ng-container>

          <!-- Drop Down selector -->
          <ng-container *ngIf="subcontrol.type === 'dropdown'">
            <mat-form-field [style]="subcontrol.options?.style">
              <mat-label>{{ subcontrol.label }}</mat-label>
              <mat-select [formControlName]="subcontrol.ctrl_name" [multiple]="subcontrol.options?.multiple"
                (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
                (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
                <mat-option *ngFor="let opt of subcontrol.values" [value]="opt.key">
                  {{ opt.key }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </ng-container>

          <!-- Textarea -->
          <ng-container *ngIf="subcontrol.type === 'textarea'">
            <mat-form-field [style]="subcontrol.options?.style">
              <textarea matInput [formControlName]="subcontrol.ctrl_name" [value]="subcontrol?.value"
                [id]="subcontrol.options?.id" [title]="subcontrol.options?.title" [ngStyle]="subcontrol.options?.style"
                [ngClass]="subcontrol.options?.class" [readonly]="subcontrol.options?.readonly"
                (change)="subcontrol.options?.changes ? formChanges(subcontrol.ctrl_name) : null" ngEvent
                (ngEvent)="onEvent(subcontrol.ctrl_name,$event)">
              </textarea>
            </mat-form-field>
          </ng-container>
          <div *ngIf="formControls[my_formGroup].controls[subcontrol.ctrl_name].errors">
          <mat-error>
            {{
            getErrorMessage(formControls[my_formGroup].controls[subcontrol.ctrl_name])}}</mat-error>
          <!-- {{test(formControls[my_formGroup])}} -->
          </div>
        </div>

        <ng-container *ngIf="subcontrol.formName == 'button'">
          <!-- buttons without linking -->
          <button *ngIf="subcontrol.buttonName == 'buttonRaised'" [ngClass]="subcontrol.options?.class"
            [type]="subcontrol?.buttonType" [disabled]="subcontrol.options?.disabled ? subcontrol.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)" [color]="subcontrol.options?.color"
            [disableRipple]="subcontrol.options?.disableRipple"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" mat-raised-button>
            {{ subcontrol.label }}
          </button>

          <button *ngIf="subcontrol.buttonName == 'buttonStroked'" [type]="subcontrol?.buttonType" [ngClass]="subcontrol.options?.class"
          [disabled]="subcontrol.options?.disabled ? subcontrol.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)" [color]="subcontrol.options?.color"
            [disableRipple]="subcontrol.options?.disableRipple"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" mat-stroked-button>
            {{ subcontrol.label }}
          </button>

          <button *ngIf="subcontrol.buttonName == 'buttonFlat'" [type]="subcontrol?.buttonType" [ngClass]="subcontrol.options?.class"
          [disabled]="subcontrol.options?.disabled ? subcontrol.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)" [color]="subcontrol.options?.color"
            [disableRipple]="subcontrol.options?.disableRipple"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" mat-flat-button>
            {{ subcontrol.label }}
          </button>

          <button *ngIf="subcontrol.buttonName == 'buttonSimple'" [type]="subcontrol?.buttonType" [ngClass]="subcontrol.options?.class"
          [disabled]="subcontrol.options?.disabled ? subcontrol.buttonType == 'reset' ? !formName.dirty : !formName.valid : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)" [color]="subcontrol.options?.color"
            [disableRipple]="subcontrol.options?.disableRipple"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" mat-button>
            {{ subcontrol.label }}
          </button>

          <a *ngIf="subcontrol.buttonName == 'link'" mat-button [href]="subcontrol.options?.link" target="_blank" [ngClass]="subcontrol.options?.class"
            [disableRipple]="subcontrol.options?.disableRipple" [color]="subcontrol.options?.color"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)">{{ subcontrol.label }}</a>

          <a *ngIf="subcontrol.buttonName == 'linkRaised'" mat-raised-button [href]="subcontrol.options?.link" [ngClass]="subcontrol.options?.class"
            target="_blank" [disableRipple]="subcontrol.options?.disableRipple" [color]="subcontrol.options?.color"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)">{{ subcontrol.label }}</a>
 
          <a *ngIf="subcontrol.buttonName == 'linkStroked'" mat-stroked-button [href]="subcontrol.options?.link" [ngClass]="subcontrol.options?.class"
            target="_blank" [disableRipple]="subcontrol.options?.disableRipple" [color]="subcontrol.options?.color"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)">{{ subcontrol.label }}</a>

          <a *ngIf="subcontrol.buttonName == 'linkFlat'" mat-flat-button [href]="subcontrol.options?.link" [ngClass]="subcontrol.options?.class"
            target="_blank" [disableRipple]="subcontrol.options?.disableRipple" [color]="subcontrol.options?.color"
            (change)="subcontrol.options?.changes ? formChanges(subcontrol.options?.operation) : null" ngEvent
            (ngEvent)="onEvent(subcontrol.buttonName,$event)">{{ subcontrol.label }}</a>
        </ng-container>
      </div>
    </div>
  </ng-template>
</form>
  `,
  styles: [
  ]
})
export class JsonFormMatComponent {

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
  
  //on submit function
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
    this.allEvents.emit({"form":this.myForm, "event":"changes","emitter": name, "controls":this.formControls})
  }

  //button event emitter
  onEvent(name: any, event: any) {
    this.allEvents.emit({"form":this.myForm, "event":event, "emitter":name, "controls":this.formControls})
  }

  changeValidity(ctrl: any, val: any) {

    // remove validators and hide auditInfo fields
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
