import { TestBed } from '@angular/core/testing';

import { JsonFormHtmlService } from './json-form-html.service';

describe('JsonFormHtmlService', () => {
  let service: JsonFormHtmlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonFormHtmlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
