import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestbookPage } from './guestbook.page';

describe('GuestbookPage', () => {
  let component: GuestbookPage;
  let fixture: ComponentFixture<GuestbookPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(GuestbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
