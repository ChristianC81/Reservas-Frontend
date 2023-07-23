import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentPubli } from './form.component';


describe('FormComponent', () => {
  let component: FormComponentPubli;
  let fixture: ComponentFixture<FormComponentPubli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponentPubli ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponentPubli);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
