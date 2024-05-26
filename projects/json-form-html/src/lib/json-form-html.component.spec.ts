import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormHtmlComponent } from './json-form-html.component';

describe('JsonFormHtmlComponent', () => {
  let component: JsonFormHtmlComponent;
  let fixture: ComponentFixture<JsonFormHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFormHtmlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonFormHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
