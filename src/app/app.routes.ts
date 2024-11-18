// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

// Import your components
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';

// Optional: Import your AuthGuard
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] }, // Protected route
  { path: 'login', component: LoginComponent, providers:[HttpClientModule] },
  { path: 'callback', component: CallbackComponent },
  // Add other routes here
];