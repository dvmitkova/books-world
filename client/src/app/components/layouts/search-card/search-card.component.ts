import { Component, inject } from '@angular/core';
import { SearchCardService } from 'src/app/services/search-card.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css'],
})
export class SearchCardComponent {
  searchCardService = inject(SearchCardService);
  overlayOpen = this.searchCardService.overlayOpen;
}
