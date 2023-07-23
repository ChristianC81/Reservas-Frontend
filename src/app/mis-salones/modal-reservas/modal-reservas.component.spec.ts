import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReservasComponent } from './modal-reservas.component';

describe('ModalReservasComponent', () => {
  let component: ModalReservasComponent;
  let fixture: ComponentFixture<ModalReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalReservasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
