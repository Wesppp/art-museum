import { Injectable, WritableSignal, signal } from '@angular/core';

import { Loadings } from '@enums/loadings.enum';

@Injectable({
  providedIn: 'root',
})
export class LoadingsService {
  loadingState: WritableSignal<string[]> = signal<string[]>([]);

  addLoading(loadingName: Loadings): void {
    this.loadingState.update((state) => [...state, loadingName]);
  }

  removeLoading(loadingName: Loadings): void {
    this.loadingState.update((state) =>
      state.filter((ldName) => ldName !== loadingName)
    );
  }

  checkLoadings(loadingNames: string[]): boolean {
    return loadingNames.every((ldName) => this.loadingState().includes(ldName));
  }
}
