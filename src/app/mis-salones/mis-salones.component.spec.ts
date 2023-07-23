import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSalonesComponent } from './mis-salones.component';

describe('MisSalonesComponent', () => {
  let component: MisSalonesComponent;
  let fixture: ComponentFixture<MisSalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisSalonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisSalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
