import { Component } from '@angular/core';

import { LikedSongsComponent } from '../sections/liked-songs/liked-songs.component';
import { ProfileComponent } from '../sections/profile/profile.component';
import { MyPlaylistsComponent } from '../sections/my-playlists/my-playlists.component';
import { SearchArtistsComponent } from '../sections/search-artists/search-artists.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LikedSongsComponent,
     ProfileComponent,
      MyPlaylistsComponent,
       SearchArtistsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
