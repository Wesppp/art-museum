import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Loadings } from '@enums/loadings.enum';

@Injectable({
  providedIn: 'root',
})
export class LoadingsService {
  public loadingState: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  public addLoading(loadingName: Loadings): void {
    this.loadingState.next([...this.loadingState.value, loadingName]);
  }

  public removeLoading(loadingName: Loadings): void {
    this.loadingState.next(
      this.loadingState.value.filter((ldName) => ldName !== loadingName)
    );
  }

  public checkLoadings(loadingNames: string[]): boolean {
    return loadingNames.every((ldName) =>
      this.loadingState.value.includes(ldName)
    );
  }
}
