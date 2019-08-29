import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocusignService {
    protected storage = localStorage;
    readonly INTEGRATOR_KEY = '168e8081-4360-4ef9-87e3-291af61857be'
    readonly ACCOUNT_ID = '43070099-7268-431e-84ca-b8b2bbe2f328'
    //readonly REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A4200%2Fadmin%2Fcallback'
    readonly REDIRECT_URI = 'https://ua-mvp-dev.firebaseapp.com/admin/callback'

    protected token;
    protected windowRef;

    constructor(
        private ar: ActivatedRoute,
        private toastr: ToastrService,
        private http: HttpClient,
    ) {
        this.loadToken();
    }

    redirectHandler() {
        this.token = this.parseToken();
        this.storage.setItem('docusignToken', JSON.stringify(this.token));
        // window.opener.postMessage({ close: true }, "*");
        window.close()
        return this.getToken();
    }

    parseToken() {
        const token = {}
        this.ar.snapshot.fragment.split('&').forEach(v => {
            const param = v.split('=');
            if (param && param[0]) {
                token[param[0]] = param[1] || '';
            }
        })
        return token;
    }

    refreshToken() {

    }

    getToken() {
        return (this.token && this.token.access_token) || false
    }

    redirect() {
        const url = `https://account-d.docusign.com/oauth/auth?response_type=token&scope=signature&client_id=${this.INTEGRATOR_KEY}&redirect_uri=${this.REDIRECT_URI}`;
        this.windowRef = window.open(url, 'Fetching Token', 'width=400,height=400')
        this.windowRef.focus();
        const subscriber = fromEvent(document, 'click').subscribe(() => {
            this.windowRef.focus();
        });
        // this.windowRef.addEventListener("message", (e) => {
        //   console.log(e);
        // })
        this.windowRef.onbeforeunload = () => {
            subscriber.unsubscribe()
            this.loadToken();
            if (this.token['access_token']) {
                this.toastr.success("Docusign token captured successfully.")
            }
        }
    }

    loadToken() {
        try {
            this.token = JSON.parse(this.storage.getItem('docusignToken'));
        } catch (error) {
        }
    }

    getUserInfo() {        
        const payload = { 
            method: "GET",
            body: '', 
            url: `https://demo.docusign.net/restapi/v2/login_information`, 
            options: this.options() 
        };
        return this.http.post('http://codebites.in/UA/client/index.php',payload , this.options())
    }

    uploadPDF(data) {
        const payload = {            
            "documents": [
                {
                    "documentBase64": data.content || '',
                    "documentId": "100",
                    "fileExtension": "PDF",
                    "name": data.content_name || '',
                    "order": "1"
                }
            ],
            "emailSubject": "Signing Document",
            "recipients": {
                "signers": [
                    {
                        "email": data.email,
                        "name": data.name,
                        "recipientId": "101"
                    }
                ]
            },
            "status": "sent"
        };
       // return this.http.post('http://localhost/client/index.php', {method: "POST", body: payload, url: `https://demo.docusign.net/restapi/v2/accounts/${this.ACCOUNT_ID}/envelopes`, options: this.options() }, this.options())
        return this.http.post('http://codebites.in/UA/client/index.php', {method: "POST", body: payload, url: `https://demo.docusign.net/restapi/v2/accounts/${this.ACCOUNT_ID}/envelopes`, options: this.options() }, this.options())
        //   return this.http.post(`https://demo.docusign.net/restapi/v2/accounts/${this.ACCOUNT_ID}/envelopes`, payload, this.options())
    }

    options() {
        return {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token.access_token,
            }
        }
    }
}  