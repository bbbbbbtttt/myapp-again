import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const serviceAccount = require('../permissions.json')
const cors = require('cors')({ origin: true })

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://project-1891851661445564942.firebaseio.com'
})

export const posts = functions.https.onRequest(async (request, response) => {
	const docs = await admin.firestore().collection('posts').orderBy('date', 'desc').get()
	cors(request, response, () => {})
	response.json(
		docs.docs.map((doc) => {
			return {
				postID: doc.id,
				...doc.data()
			}
		})
	)
})
