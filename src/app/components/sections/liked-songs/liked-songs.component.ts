import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { AuthService } from '../../../services/auth.service';
import { DurationPipe } from '../../../shared/duration.pipe';

@Component({
  selector: 'app-liked-songs',
  standalone: true,
  imports: [CommonModule, DurationPipe],
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.css']
})
export class LikedSongsComponent implements OnInit {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  likedSongs: any[] = [];

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Initialize the tokens in ngOnInit
    this.accessToken = this.auth.getAccessToken();
    this.refreshToken = this.auth.getRefreshToken();
    console.log(this.auth.getAccessToken());
  }

  loadLikedSongs() {
    console.log('Access Token:', this.accessToken); // This should now print the actual token
    // Your logic for loading liked songs can go here
    this.fetchSongs(25);

  }
  fetchSongs(size: number) {
    let apiUrl = 'https://api.spotify.com/v1/me/tracks';
    const params = new HttpParams().set('limit', size);
    
    const headers = new HttpHeaders(
      {
        Authorization: `Bearer ${this.accessToken}`
      }
    );
    this.http.get(apiUrl, {headers, params}).subscribe((data: any)=>this.likedSongs.push(...data['items']));
  }

  // Add the trackById function here
  trackById(index: number, song: any): any {
    console.log(song);
    return song.id || index;
  }
}
