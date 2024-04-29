import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { ComponentRef } from '@angular/core';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let componentRef: ComponentRef<PaginatorComponent>;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatorComponent, CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('total_pages', 10);
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

  it('should not change page number when changePage is called with negative value and page is 1', () => {
    const initialPage = 1;
    const value = -1;

    component.changePage(value);

    expect(component.page()).toBe(initialPage);
  });

  it('should not change page number when changePage is called with positive value and page is equal to total_pages', () => {
    componentRef.setInput('total_pages', 10);
    const initialPage = component.total_pages();
    componentRef.setInput('page', initialPage);
    const value = 1;

    component.changePage(value);

    expect(component.page()).toBe(initialPage);
  });
});
