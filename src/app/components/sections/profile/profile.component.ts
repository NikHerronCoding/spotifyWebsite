import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:true
})
export class ProfileComponent implements OnInit {
  userName = 'User Name'; // Placeholder - replace with Spotify API data
  profilePicture = 'https://coin-images.coingecko.com/coins/images/34755/large/IMG_0015.png?1705957165'; // Placeholder image

  ngOnInit(): void {
    this.loadUserProfile(); // Placeholder for Spotify API call
  }

  loadUserProfile(): void {
    // Fetch user profile data from Spotify API
  }
}