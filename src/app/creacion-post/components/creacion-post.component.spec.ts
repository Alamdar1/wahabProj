import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionPostComponent } from './creacion-post.component';

describe('CreacionPostComponent', () => {
  let component: CreacionPostComponent;
  let fixture: ComponentFixture<CreacionPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
