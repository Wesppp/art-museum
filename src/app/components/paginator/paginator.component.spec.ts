import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changePageEvent with new page number when onSelectPage is called', () => {
    const pageNumber = 2;
    const emitSpy = jest.spyOn(component.changePageEvent, 'emit');

    component.onSelectPage(pageNumber);

    expect(emitSpy).toHaveBeenCalledWith(pageNumber);
  });

  it('should change page number when changePage is called with positive value', () => {
    const initialPage = component.page;
    component.total_pages = 10;

    const value = 1;

    component.changePage(value);

    expect(component.page).toBe(initialPage + value);
  });

  it('should not change page number when changePage is called with negative value and page is 1', () => {
    const initialPage = 1;
    component.page = initialPage;
    const value = -1;

    component.changePage(value);

    expect(component.page).toBe(initialPage);
  });

  it('should not change page number when changePage is called with positive value and page is equal to total_pages', () => {
    const initialPage = component.total_pages;
    component.page = initialPage;
    const value = 1;

    component.changePage(value);

    expect(component.page).toBe(initialPage);
  });
});
