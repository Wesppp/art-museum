import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty error message', () => {
    const errorMessageSubscription = service.errorMessage$;

    errorMessageSubscription.subscribe((errorMessage) => {
      expect(errorMessage).toBe('');
    });
  });

  it('should set an error message', () => {
    const errorMessage = 'Test error message';

    service.setErrorMessage(errorMessage);

    service.errorMessage$.subscribe((message) => {
      expect(message).toBe(errorMessage);
    });
  });

  it('should update the error message', () => {
    const initialErrorMessage = 'Initial error message';
    const updatedErrorMessage = 'Updated error message';

    service.setErrorMessage(initialErrorMessage);
    service.setErrorMessage(updatedErrorMessage);

    service.errorMessage$.subscribe((message) => {
      expect(message).toBe(updatedErrorMessage);
    });
  });
});
