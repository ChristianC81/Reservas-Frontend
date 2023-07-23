import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponentRegistro } from './form.component';

describe('FormComponent', () => {
  let component: FormComponentRegistro;
  let fixture: ComponentFixture<FormComponentRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponentRegistro ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponentRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
