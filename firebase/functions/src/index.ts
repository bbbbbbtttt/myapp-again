import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
Import * as cors from 'cors'
const serviceAccount = require('../permissions.json')
Const corsHandler = cors({origin: true})
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://project-1891851661445564942.firebaseio.com'
})

export const getFeed1 = functions.https.onRequest(async (request, response) => {
        
        const docs = await admin.firestore().collection('posts').orderBy('date', 'desc').get()
        corsHandler(request, response, () => {})
        response.json(docs.docs.map(doc => {
            return {
                postID: doc.id,
                ...doc.data()
            }
        })
        )
    })
