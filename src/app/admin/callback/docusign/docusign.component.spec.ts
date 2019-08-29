import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocusignComponent } from './docusign.component';

describe('DocusignComponent', () => {
  let component: DocusignComponent;
  let fixture: ComponentFixture<DocusignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocusignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocusignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
