import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchCardService {

  overlayOpen = signal(false);

  constructor() { }
}
