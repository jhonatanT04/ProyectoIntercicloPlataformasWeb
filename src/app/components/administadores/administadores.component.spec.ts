import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministadoresComponent } from './administadores.component';

describe('AdministadoresComponent', () => {
  let component: AdministadoresComponent;
  let fixture: ComponentFixture<AdministadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
