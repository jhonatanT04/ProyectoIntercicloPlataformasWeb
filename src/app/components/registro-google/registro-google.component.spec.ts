import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroGoogleComponent } from './registro-google.component';

describe('RegistroGoogleComponent', () => {
  let component: RegistroGoogleComponent;
  let fixture: ComponentFixture<RegistroGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
