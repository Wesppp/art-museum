import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private errorMessageSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public errorMessage$: Observable<string> =
    this.errorMessageSubject.asObservable();

  constructor() {}

  public setErrorMessage(message: string): void {
    this.errorMessageSubject.next(message);
  }
}
