import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFaltanteComponent } from './info-faltante.component';

describe('InfoFaltanteComponent', () => {
  let component: InfoFaltanteComponent;
  let fixture: ComponentFixture<InfoFaltanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFaltanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoFaltanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
