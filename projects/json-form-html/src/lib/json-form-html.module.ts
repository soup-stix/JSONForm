import { NgModule } from '@angular/core';
import { JsonFormHtmlComponent } from './json-form-html.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NgShowDirective } from './ng-show.directive';


@NgModule({
  declarations: [
    JsonFormHtmlComponent,
    NgShowDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    JsonFormHtmlComponent
  ]
})
export class JsonFormHtmlModule { }
