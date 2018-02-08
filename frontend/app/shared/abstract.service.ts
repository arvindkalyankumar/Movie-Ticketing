import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';
import { RequestOptions, Headers } from '@angular/http';

export class AbstractService {

    protected backendUrl = 'http://localhost:3000/backend';

    protected constructor() {
    }

    protected getRequestOptions(): RequestOptions {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem(AuthenticationService.authTokenProperty)
        });
        return new RequestOptions({headers: headers});
    }

    protected extractData(res: any) {
        let body: any = res.json();
        return body || {};
    }

    protected handleError(error: any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body: any = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}