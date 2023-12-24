import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard, } from '@utility/guards';
import { environment } from '@environment';
import { LoginPageComponent } from './pages/auth-pages/login-page/login-page.component';
import { NextPageComponent } from './pages/next-step/next-page.component';
import { GuessPageComponent } from './pages/guess/guess-page.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    title: `Dashboard | ${environment.application_name}`,
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'next',
    title: `Next`,
    component: NextPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'guess',
    title: `Guess`,
    component: GuessPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    title: `Login | ${environment.application_name}`,
    component: LoginPageComponent,
  },
  {
    path: '**',
    title: `Login | ${environment.application_name}`,
    component: LoginPageComponent,
  },
];
