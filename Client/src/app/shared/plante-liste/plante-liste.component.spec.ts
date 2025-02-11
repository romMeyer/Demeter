import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanteListeComponent } from './plante-liste.component';

describe('PlanteListeComponent', () => {
  let component: PlanteListeComponent;
  let fixture: ComponentFixture<PlanteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
