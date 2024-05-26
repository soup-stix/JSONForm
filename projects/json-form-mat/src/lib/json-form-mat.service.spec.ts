import { TestBed } from '@angular/core/testing';

import { JsonFormMatService } from './json-form-mat.service';

describe('JsonFormMatService', () => {
  let service: JsonFormMatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonFormMatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
