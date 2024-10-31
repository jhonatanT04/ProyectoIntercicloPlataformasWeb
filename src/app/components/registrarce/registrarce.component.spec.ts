import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarceComponent } from './registrarce.component';

describe('RegistrarceComponent', () => {
  let component: RegistrarceComponent;
  let fixture: ComponentFixture<RegistrarceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
