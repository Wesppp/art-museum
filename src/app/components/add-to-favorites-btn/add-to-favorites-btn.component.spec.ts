import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AddToFavoritesBtnComponent } from './add-to-favorites-btn.component';
import { ComponentRef, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ArtworksService } from '@services/artworks.service';
import { LocalStorageService } from '@services/local-storage.service';
import { LocalStorage } from '@enums/local-storage.enum';

const mockArtworksService = {
  urlFor: jest.fn(),
  removedArtworkFromFavorites: signal<number>(1),
};

const mockLocalstorageService = {
  urlFor: jest.fn(),
  addElementToStorage: jest.fn(),
  removeElementFromStorage: jest.fn(),
  getStorageData: jest.fn(),
};

describe('AddToFavoritesBtnComponent', () => {
  let component: AddToFavoritesBtnComponent;
  let componentRef: ComponentRef<AddToFavoritesBtnComponent>;
  let fixture: ComponentFixture<AddToFavoritesBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavoritesBtnComponent, HttpClientModule],
      providers: [
        { provide: ArtworksService, useValue: mockArtworksService },
        { provide: LocalStorageService, useValue: mockLocalstorageService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavoritesBtnComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('artworkId', 1234);
    mockLocalstorageService.getStorageData.mockReturnValue([]);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
    mockArtworksService.urlFor.mockReset();
    mockLocalstorageService.urlFor.mockReset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "white" class when bgColor is WHITE', () => {
    componentRef.setInput('bgColor', 'white');

    fixture.detectChanges();

    const aElement = fixture.debugElement.query(By.css('button'));
    const containsWhite = aElement.nativeElement.classList.contains('white');
    const containsGray = aElement.nativeElement.classList.contains('gray');
    expect(containsWhite || containsGray).toBe(true);
    expect(containsWhite && containsGray).toBe(false);
  });

  it('should apply "gray" class when bgColor is GRAY', () => {
    componentRef.setInput('bgColor', 'gray');

    fixture.detectChanges();

    const aElement = fixture.debugElement.query(By.css('button'));
    const containsWhite = aElement.nativeElement.classList.contains('white');
    const containsGray = aElement.nativeElement.classList.contains('gray');
    expect(containsWhite || containsGray).toBe(true);
    expect(containsWhite && containsGray).toBe(false);
  });

  it('should add artwork to favorites and localStorage', () => {
    component.favoritesArtworks = [];
    const id = 1234;
    const event = new MouseEvent('click');

    component.addToFavorites(id, event);

    expect(component.favoritesArtworks.includes(id)).toBe(true);
    expect(mockLocalstorageService.addElementToStorage).toHaveBeenCalledWith(
      LocalStorage.FAVORITES,
      id
    );
  });

  it('should remove artwork from favorites and localStorage', () => {
    const id = 1234;
    const event = new MouseEvent('click');
    component.favoritesArtworks = [1234];

    component.addToFavorites(id, event);

    expect(component.favoritesArtworks.includes(id)).toBe(false);
    expect(
      mockLocalstorageService.removeElementFromStorage
    ).toHaveBeenCalledWith(LocalStorage.FAVORITES, id);
    expect(mockArtworksService.removedArtworkFromFavorites()).toBe(id);
  });
});
