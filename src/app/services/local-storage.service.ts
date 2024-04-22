import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public addElementToStorage<T>(key: string, element: T): T {
    const existingData: T[] = JSON.parse(localStorage.getItem(key) || '[]');

    if (existingData.includes(element)) {
      return element;
    }

    localStorage.setItem(key, JSON.stringify([...existingData, element]));

    return element;
  }

  public removeElementFromStorage<T>(key: string, element: T): void {
    const existingData: T[] = this.getStorageData<T[]>(key);
    const updatedData: T[] = existingData.filter((item: T) => item !== element);

    localStorage.setItem(key, JSON.stringify(updatedData));
  }

  public getStorageData<T>(key: string): T | [] {
    const existingData: string | null = localStorage.getItem(key);

    if (existingData) {
      return JSON.parse(existingData);
    }

    return [];
  }
}
