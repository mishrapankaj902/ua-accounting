const nodemailer = require('nodemailer');
import * as admin from 'firebase-admin';
import * as Handlebars from 'handlebars';
// const functions = require('firebase-functions');
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;

export class SendMail {
    private db: admin.firestore.Firestore;
    private template: any;
    private templateData: any;
    // private Mailer: any
    public mailOptions: any = {
        from: '"Aashu" <aashu.engineer@gmail.com>',
        to: 'aashu.engineer@gmail.com',
        subject: '',
        html: ''
    }
    constructor(template: any, data: any) {
        this.db = admin.firestore();
        this.template = template
        this.templateData = data;

    }
    get nodemailer() {
        return nodemailer;
    }
    async sendEmail() {
        return new Promise((resolve, reject) => {
            try {
                Promise.all([
                    this.db.collection('BasicConfig').doc('email-from').get(),
                    this.db.collection('BasicConfig').doc('email-smtp-cred').get()
                ]).then(async d => {
                    console.log(d[0].data());
                    this.mailOptions.from = (<any>d[0].data()).from;
                    this.mailOptions.to = this.parseTempalte(this.template.to, this.templateData)
                    this.mailOptions.subject = this.parseTempalte(this.template.subject, this.templateData)
                    this.mailOptions.html = this.parseTempalte(this.template.template, this.templateData)
                    const ref = await nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'ashutosh.sdd@gmail.com',
                            pass: 'test#aashu',
                        },
                    }).sendMail(this.mailOptions)
                    console.log(ref);
                }).catch(e => {
                    console.log(e);
                })
                resolve('mail sent');
            } catch (error) {
                reject(error)
            }
        })
    }

    parseTempalte(template: string, data: any) {
        return Handlebars.compile(template)(data);
    }

    setBody(html: string) {
        this.mailOptions.html = html;
        return this;
    }

    setSubject(subject: string) {
        this.mailOptions.subject = subject;
        return this;
    }

    setTo(to: string) {
        this.mailOptions.to = to;
        return this;
    }

}