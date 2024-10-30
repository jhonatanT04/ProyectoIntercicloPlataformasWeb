import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEspaciosComponent } from './gestion-espacios.component';

describe('GestionEspaciosComponent', () => {
  let component: GestionEspaciosComponent;
  let fixture: ComponentFixture<GestionEspaciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEspaciosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEspaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
