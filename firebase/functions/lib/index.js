"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posts = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require('../permissions.json');
const cors = require('cors')({ origin: true });
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://project-1891851661445564942.firebaseio.com'
});
exports.posts = functions.https.onRequest(async (request, response) => {
    const docs = await admin.firestore().collection('posts').orderBy('date', 'desc').get();
    cors(request, response, () => { });
    response.json(docs.docs.map((doc) => {
        return Object.assign({ postID: doc.id }, doc.data());
    }));
});
//# sourceMappingURL=index.js.map
