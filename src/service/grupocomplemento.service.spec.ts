import { TestBed } from '@angular/core/testing';

import { GrupocomplementoService } from './grupocomplemento.service';

describe('GrupocomplementoService', () => {
  let service: GrupocomplementoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupocomplementoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
