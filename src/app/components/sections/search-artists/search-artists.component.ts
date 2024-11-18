import { Component } from '@angular/core';

@Component({
  selector: 'app-search-artists',
  standalone: true,
  imports: [],
  templateUrl: './search-artists.component.html',
  styleUrl: './search-artists.component.css'
})
export class SearchArtistsComponent {
  onSearch(event : any) {
    console.log('searching...');
    console.log(event.target.value);
  }
}
