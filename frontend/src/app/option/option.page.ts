import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Http } from '@angular/http'
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import { firestore } from 'firebase/app'
import { Clipboard } from '@ionic-native/clipboard/ngx'
import { AlertController } from '@ionic/angular'

@Component({
	selector: 'app-option',
	templateUrl: './option.page.html',
	styleUrls: ['./option.page.scss']
})
export class OptionPage implements OnInit {
	darkMode: any

	titredeprop: string

	date: string

	busy: boolean = false

	prop
	mail: 'Eloocontact@gmail.com'

	constructor(
		private router: Router,

		public http: Http,
		public afstore: AngularFirestore,
		public user: UserService,
		public clipboard: Clipboard,
		private alertController: AlertController
	) {}

	ngOnInit() {}
	CopyEmail() {
		this.clipboard.copy(this.mail)
	}

	go() {
		this.router.navigate(['edit-profile/'])
	}
	logout() {
		this.router.navigate(['login/'])
	}
	async comptepro() {
		const alert = await this.alertController.create({
			header: 'bientot disponible',
			message:
				'vous avez besoin de visibiliter pour votre marque les publicités sont bientôt disponible',
			buttons: ['Cool!']
		})

		await alert.present()
	}

	async creatprop() {
		this.busy = true

		const titredeprop = this.titredeprop

		this.afstore.doc(`users/${this.user.getUID()}`).update({
			prop: firestore.FieldValue.arrayUnion(`${titredeprop}`)
		})

		this.afstore.doc(`prop/${titredeprop}`).set({
			date: new Date().toISOString(),

			author: this.user.getUsername(),
			likes: [],
			titredeprop
		})

		this.busy = false

		this.titredeprop = ''

		this.date = ''

		const alert = await this.alertController.create({
			header: 'OK',
			message: 'ta proposition est prise en compte merci pour tout!',
			buttons: ['Cool!']
		})

		await alert.present()

		this.router.navigate(['/tabs/profile'])
	}
}
