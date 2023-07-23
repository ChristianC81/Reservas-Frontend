import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmininicioComponent } from './admininicio.component';

describe('AdmininicioComponent', () => {
  let component: AdmininicioComponent;
  let fixture: ComponentFixture<AdmininicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmininicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmininicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
