import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecPasComponent } from './rec-pas.component';

describe('RecPasComponent', () => {
  let component: RecPasComponent;
  let fixture: ComponentFixture<RecPasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecPasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecPasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
