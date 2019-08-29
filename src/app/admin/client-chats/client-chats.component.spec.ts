import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientChatsComponent } from './client-chats.component';

describe('ClientChatsComponent', () => {
  let component: ClientChatsComponent;
  let fixture: ComponentFixture<ClientChatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientChatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
