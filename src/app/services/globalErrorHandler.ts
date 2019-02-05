import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
      private injector: Injector
  ) {

  }
  handleError(error) {
       const router = this.injector.get(Router);
       const tokenStorage = this.injector.get(TokenStorage);

      if ((error === 'Unauthorized' || error['error'] === 'Unauthorized') && router !== null) {
          tokenStorage.signOut();
          router.navigate(['/login']);
      }
     // IMPORTANT: Rethrow the error otherwise it gets swallowed
     throw error;
  }
}
