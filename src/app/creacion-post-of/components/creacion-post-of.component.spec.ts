import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPostOfComponent } from './creacion-post-of.component';

describe('CreacionPostOfComponent', () => {
  let component: CreacionPostOfComponent;
  let fixture: ComponentFixture<CreacionPostOfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionPostOfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionPostOfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
