import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { CinemaComponent } from './cinema/cinema.component';
import { MovieComponent } from './movie/movie.component';
import { SeatComponent } from './seat/seat.component';
import { OrderComponent } from './order/order.component';

import { ReviewComponent } from './review/review.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'cinemas', component: CinemaComponent},
    {path: 'movies', component: MovieComponent},
    {path: 'reviews', component: ReviewComponent},
    {path: 'seat', component: SeatComponent},
    {path: 'order', component: OrderComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'movies'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
