import { SendMail } from './send.mail';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
const util = require("util");
import bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const byPassAuth = ['/api/v1/ClientBasicInfo/create-login'];
// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req: any, res: any, next: any) => {
    if (byPassAuth.indexOf(req.originalUrl) !== -1) {
        console.log('Auth by passed')
        next()
        return;
    }
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
};
app.use('/api/v1', router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const options = {
    origin: true,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true
};
app.use(cors(options));
app.use(validateFirebaseIdToken);

// admin.initializeApp();
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://ua-mvp-dev.firebaseio.com"
// });
const serviceAccount = require(__dirname + "/ua-serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://aashu-chat-app.firebaseio.com"
})
// const serviceAccount = require(__dirname + "/66614.json");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://66614.firebaseio.com"
// });
router.get('/', (req: express.Request, res: express.Response) => {
    res.send('thanks');
});

router.post('/ClientBasicInfo', async (req: express.Request, res: express.Response) => {
    let mail = false;
    const $body = req.body;
    if (!$body.user_created) {
        mail = $body.user_created = true;
    }
    admin.firestore().collection('ClientBasicInfo').doc($body.$id).update($body).then(() => {
        if (mail) {
            void Promise.all([
                admin.firestore().collection('EmailTemplate').doc('create-account').get(),
                admin.firestore().collection('ClientBasicInfo').doc($body.$id).get()
            ]).then(template => {
                (new SendMail(template[0].data(), template[1].data()))
                    .sendEmail().then(console.log)
                    .catch(console.error)
                res.json({ status: 'success', message: 'mail sent.' });
            }).catch(console.error)
        } else {
            res.json({ status: 'success', message: 'data updated.' });
        }
    }).catch(e => {
        console.log(e)
        res.status(422).json({ status: 'failed', message: 'Updation Failed.' });
    })
});

router.post('/ClientBasicInfo/create-login', async (req: express.Request, res: express.Response) => {
    const $body = req.body;
    console.log(util.inspect(req.body));
    try {
        const data = await admin.firestore().collection('ClientBasicInfo').where('token', '==', $body.token).get();
        console.log(data.docs.length)
        if (data.docs.length === 1) {
            admin.firestore().collection('ClientBasicInfo').doc(data.docs[0].id).update({ token: null }).then(() => { }).catch(() => { })
            const user = await admin.auth().createUser({
                email: $body.email,
                password: $body.password,
                displayName: $body.displayName
            })
            res.end(util.inspect(user));
            admin.firestore().collection('Users').doc(user.uid).create({
                roles: ["client"]
            }).then(console.log).catch(console.error)
        }
        res.status(422).json({ status: 'failed', message: 'invalid Client token.' }).end();
    } catch (e) {
        res.end(util.inspect(e));
    }
});

router.get('/users', (req, res) => {
    console.log('token', req.query.nextPage);
    admin.database().ref('userCount').transaction(userCount => console.log(userCount));
    admin.auth().listUsers(100, req.query.nextPage)
        .then((listUsersResult) => {
            const users: any = [];
            listUsersResult.users.map((v, k) => {
                users[k] = {
                    uid: v.uid,
                    email: v.email,
                    emailVerified: v.emailVerified,
                    disabled: v.disabled,
                    metadata: v.metadata
                }
            });

            res.status(200).json({ users: users, pageToken: listUsersResult.pageToken });
            console.log('user returned');
        }).catch((error) => {
            res.status(500).json({ status: 'failed', dev: error.message });
            console.log('Error listing users:', error);
        });
});

app.all('*', function (req, res) {
    res.send(req.url);
});

//Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);
