import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollToService {
  returnToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToPosition(target: string): void {
    document
      .querySelector(target)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
