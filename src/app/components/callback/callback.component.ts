import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-callback',
  template: `<p>Logging you in...</p>`
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    // This runs automatically when the component is loaded
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.handleCallback(code).then(
          ()=> {
            this.router.navigate(['']);
          }
        );
        
      } else {
        console.error('Authorization code not found');
        // Optionally, handle error or redirect to login
      }
    });
  }
}