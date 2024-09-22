import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantesAddComponent } from './plantes-add.component';

describe('PlantesAddComponent', () => {
  let component: PlantesAddComponent;
  let fixture: ComponentFixture<PlantesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
