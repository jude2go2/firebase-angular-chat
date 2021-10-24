import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeComponentComponent } from './fake-component.component';

describe('FakeComponentComponent', () => {
  let component: FakeComponentComponent;
  let fixture: ComponentFixture<FakeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
