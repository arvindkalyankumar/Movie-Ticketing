import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../login/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'appHeader',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    private NextPhotoInterval:number = 2000;
    private noLoopSlides:boolean = false;
    private slides:Array<any> = [];

    constructor(private router: Router, private authenticationService: AuthenticationService) {
       this.addNewSlide();
    }

    private addNewSlide() {
         this.slides.push(
            {image:'https://i2.wp.com/4kwallpapers.site/wp-content/uploads/2012/07/the-dark-kinght-rises-2012-wide-screen-hd.jpg?resize=600,375',text:''},
            {image:'http://www.indiewire.com/wp-content/uploads/2016/08/suicide-squad.jpg?w=670',text:'SUICIDE SQUAD'},
            {image:'https://i2.wp.com/marvelversepodcast.acrosstheairwaves.com/wp-content/uploads/2016/06/marvel_deadpool_movie-wide.jpg',text:'DEADPOOL'},
            {image:'https://images.moviepilot.com/images/c_limit,q_auto:good,w_600/a5ejgzr52av2nx90plpd/marvel-studios.jpg',text:'DR STRANGE'},
            {image:'http://wide-wallpapers.net/wp-content/uploads/walls/thumbs/star-wars-7-the-force-awakens-2015-darth-vader-600x375.jpg',text:'STAR WARS'},
            {image:'https://images.moviepilot.com/images/c_limit,q_auto:good,w_600/n5yo8faom28nzupn6hdy/x-men-apocalypse-not-quite-complete.jpg',text:'WOLVERINE'}
        );
    }

    private removeLastSlide() {
        this.slides.pop();
    }
    ngOnInit() {

    }

    isAuthorized(): boolean {
        return this.authenticationService.isAuthorized();
    }

    signOut() {
        this.authenticationService.logout();
    }

    signIn() {
        this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
    }

    currentRouteEquals(arg: string): boolean {
        const urlParamsPosition = this.router.url.indexOf('?') > 0 ?
            this.router.url.indexOf('?') :
            this.router.url.length;
        const url = this.router.url.substring(0, urlParamsPosition);
        return arg === url;
    }

}