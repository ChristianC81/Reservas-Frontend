import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpublicacionComponent } from './adminpublicacion.component';

describe('AdminpublicacionComponent', () => {
  let component: AdminpublicacionComponent;
  let fixture: ComponentFixture<AdminpublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminpublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
