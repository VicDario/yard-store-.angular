import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface OnExit {
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const exitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return false;/* component?.onExit ? component.onExit() : true; */
};
