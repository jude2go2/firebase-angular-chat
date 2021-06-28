import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomContainerComponent } from './chatroom-container.component';

describe('ChatroomContainerComponent', () => {
  let component: ChatroomContainerComponent;
  let fixture: ComponentFixture<ChatroomContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatroomContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatroomContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
