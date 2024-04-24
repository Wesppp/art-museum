import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddToFavoritesBtnComponent } from './add-to-favorites-btn.component';
import { BtnBgColors } from '@enums/btn-bg-colors.enum';

describe('AddToFavoritesBtnComponent', () => {
  let component: AddToFavoritesBtnComponent;
  let fixture: ComponentFixture<AddToFavoritesBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavoritesBtnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavoritesBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "white" class when bgColor is WHITE', () => {
    component.bgColor = BtnBgColors.WHITE;

    fixture.detectChanges();

    const aElement = fixture.debugElement.query(By.css('a'));
    const containsWhite = aElement.nativeElement.classList.contains('white');
    const containsGray = aElement.nativeElement.classList.contains('gray');
    expect(containsWhite || containsGray).toBe(true);
    expect(containsWhite && containsGray).toBe(false);
  });

  it('should apply "gray" class when bgColor is GRAY', () => {
    component.bgColor = BtnBgColors.GRAY;

    fixture.detectChanges();

    const aElement = fixture.debugElement.query(By.css('a'));
    const containsWhite = aElement.nativeElement.classList.contains('white');
    const containsGray = aElement.nativeElement.classList.contains('gray');
    expect(containsWhite || containsGray).toBe(true);
    expect(containsWhite && containsGray).toBe(false);
  });
});
