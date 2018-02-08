import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CinemaComponent } from './cinema/cinema.component';
import { MovieComponent } from './movie/movie.component';
import { OrderComponent } from './order/order.component';
import { HeaderComponent } from './header/header.component';
import { Carousel } from './header/carousel.component';
import { Slide } from './header/slide.component';

import { SeatComponent }  from './seat/seat.component';
import { SeatPlan }  from './seat/seat.plan';
import { SeatBooked }  from './seat/seat.booked';
import { SeatReservationService } from './seat/seat.reservation.service';

import { AppRoutingModule }     from './app-routing.module';
import { HttpModule } from '@angular/http';
import {ReviewComponent} from "./review/review.component";
import { AuthenticationService } from './login/authentication.service';
import { AuthGuard } from './shared/auth.guard';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        CinemaComponent,
        MovieComponent,
        OrderComponent,
        ProfileComponent,
        Carousel,
        Slide,
        SeatBooked,
        SeatPlan,
        SeatComponent,
        ReviewComponent,
        ProfileComponent
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        SeatReservationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
