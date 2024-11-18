import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private clientId = environment.spotify.clientId;
  private redirectUri = environment.spotify.redirectUri;
  private codeVerifier!: string;

  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient, private router:Router) {

   }

  //returns random string of numbers
  private generateCodeVerifier(length:number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  
  //returns hashed and encoded version of the random string given to it
  private async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(digest);
  }
  //encodes the string to a URL safe format
  private base64UrlEncode(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }



  async initiateAuth() {
    this.codeVerifier = this.generateCodeVerifier(128);
    console.log('Generated Code Verifier:', this.codeVerifier); // Should log immediately

    // Await the async function to ensure the code challenge logs correctly
    const codeChallenge = await this.generateCodeChallenge(this.codeVerifier);
    console.log('Generated Code Challenge:', codeChallenge);     // Should log immediately after codeVerifier

    localStorage.setItem('pkce_code_verifier', this.codeVerifier);

    const params = new HttpParams({
      fromObject: {
        response_type: 'code',
        client_id: this.clientId,
        scope: 'user-read-private user-read-email user-library-read',
        redirect_uri: this.redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      }
    });

    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    await console.log('Redirecting to Auth URL:', authUrl); // Confirm URL before redirection
    window.location.href = authUrl;
}

async handleCallback(code: string): Promise<void> {
  // Retrieve the code_verifier from local storage
  this.codeVerifier = localStorage.getItem('pkce_code_verifier') || '';

  // Prepare the token request body
  const body = new HttpParams({
    fromObject: {
      client_id: this.clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      code_verifier: this.codeVerifier
    }
  });

  try {
    // Send a POST request to Spotify's token endpoint
    const response: any = await this.http.post('https://accounts.spotify.com/api/token', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).toPromise();

    // Store tokens using setTokens method
    this.setTokens(response.access_token, response.refresh_token);
    console.log('tokens stored in object');

  } catch (error) {
    console.error('Token exchange failed', error);
  }
  }
    // Store access and refresh tokens
    setTokens(accessToken: string, refreshToken: string): void {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('access_token', accessToken); // Save to local storage if you want it persistent
      localStorage.setItem('refresh_token', refreshToken);

    }
  
    // Retrieve the access token
    getAccessToken(): string | null {
      return this.accessToken;
    }
  
    // Retrieve the refresh token
    getRefreshToken(): string | null {
      return this.refreshToken;
    }
  
    // Clear tokens
    clearTokens(): void {
      this.accessToken = null;
      this.refreshToken = null;
    }
}



