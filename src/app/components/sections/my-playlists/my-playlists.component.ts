import { Component } from '@angular/core';

@Component({
  selector: 'app-my-playlists',
  templateUrl: './my-playlists.component.html',
  styleUrls: ['./my-playlists.component.css'],
  standalone:true
})

export class MyPlaylistsComponent {
  loadPlaylists(): void {
    // Placeholder for Spotify API call to fetch playlists
  }
}