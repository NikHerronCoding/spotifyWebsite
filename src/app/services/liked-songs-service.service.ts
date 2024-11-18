// src/app/services/liked-songs.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikedSongsService {
  private likedSongs: any[] = [];

  constructor(private http: HttpClient) {}

  // Fetch liked songs
  loadLikedSongs() {
    return this.http.get<any[]>('https://api.spotify.com/v1/me/tracks');
  }

  // Optionally store liked songs for in-service access
  setLikedSongs(songs: any[]) {
    this.likedSongs = songs;
  }

  getLikedSongs() {
    return this.likedSongs;
  }
}

