import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    hasError = false;
    errorMessage: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.hasError = true;
                    this.errorMessage = JSON.parse(error._body).message;
                    this.loading = false;
                });
    }
}
