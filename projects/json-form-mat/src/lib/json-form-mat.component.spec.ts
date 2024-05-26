import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonFormMatComponent } from './json-form-mat.component';

describe('JsonFormMatComponent', () => {
  let component: JsonFormMatComponent;
  let fixture: ComponentFixture<JsonFormMatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonFormMatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonFormMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
