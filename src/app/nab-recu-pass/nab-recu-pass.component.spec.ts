import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabRecuPassComponent } from './nab-recu-pass.component';

describe('NabRecuPassComponent', () => {
  let component: NabRecuPassComponent;
  let fixture: ComponentFixture<NabRecuPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabRecuPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NabRecuPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
