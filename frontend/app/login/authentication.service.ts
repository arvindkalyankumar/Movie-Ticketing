import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class AuthenticationService extends AbstractService {

    public static authTokenProperty = 'auth-token';

    private authenticationUrl = '/authenticate';

    constructor(private http: Http) {
        super();
    }

    login(username: string, password: string) {
        localStorage.setItem('currentUser',username);
        const body = JSON.stringify({username: username, password: password});
        return this
            .http.post(`${this.backendUrl.concat(this.authenticationUrl)}`, body, this.getRequestOptions())
            .map((response: Response) => {
                let body: {token: string} = response.json();
                if (body && body.token) {
                    localStorage.setItem(AuthenticationService.authTokenProperty, body.token);
                }
                return body;
            });
    }

    logout() {
        localStorage.removeItem(AuthenticationService.authTokenProperty);
    }

    isAuthorized(): boolean {
        const authToken = localStorage.getItem(AuthenticationService.authTokenProperty);
        return (authToken != null) as boolean;
    }

}