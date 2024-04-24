import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addElementToStorage', () => {
    it('should add an element to storage', () => {
      const key = 'testKey';
      const element = 'testValue';

      service.addElementToStorage(key, element);

      const storedData = JSON.parse(localStorage.getItem(key) || '[]');
      expect(storedData).toContain(element);
    });

    it('should not add an element if it already exists in storage', () => {
      const key = 'testKey';
      const element = 'testValue';
      localStorage.setItem(key, JSON.stringify([element]));

      service.addElementToStorage(key, element);

      const storedData = JSON.parse(localStorage.getItem(key) || '[]');
      expect(storedData).toContain(element);
      expect(storedData.length).toBe(1);
    });
  });

  describe('removeElementFromStorage', () => {
    it('should remove an element from storage', () => {
      const key = 'testKey';
      const element = 'testValue';
      localStorage.setItem(key, JSON.stringify([element]));

      service.removeElementFromStorage(key, element);

      const storedData = JSON.parse(localStorage.getItem(key) || '[]');
      expect(storedData).not.toContain(element);
    });

    it('should not fail if element is not present in storage', () => {
      const key = 'testKey';
      const element = 'testValue';

      service.removeElementFromStorage(key, element);
    });
  });

  describe('getStorageData', () => {
    it('should return stored data', () => {
      const key = 'testKey';
      const testData = ['value1', 'value2'];
      localStorage.setItem(key, JSON.stringify(testData));

      const storedData = service.getStorageData<string[]>(key);

      expect(storedData).toEqual(testData);
    });

    it('should return empty array if no data is stored', () => {
      const key = 'nonExistentKey';

      const storedData = service.getStorageData<string[]>(key);

      expect(storedData).toEqual([]);
    });
  });
});
