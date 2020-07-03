import { Component, OnInit, ViewChild} from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  mainuser: AngularFirestoreDocument
  sub
  
  profilePic: string

  
  
  busy: boolean = false
 
  @ViewChild('fileBtn', {static: false}) fileBtn:
   {
    nativeElement: HTMLInputElement
  }

  constructor( 
    private http: Http, 
    private afs: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private user: UserService) {
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
     this.profilePic = event.profilePic
    })
   }

  ngOnInit() {
  }
  async presentAlert(title: string, content: string ) {
    const alert = await  this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  updateProfilePic() {
    this.fileBtn.nativeElement.click()

  }
  async uploadPic(event) {
    

    const files = event.target.files
    
    
    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','70ad163c6ba4aefe8e2d')

    
    this.http.post('https://upload.uploadcare.com/base/',data)
    .subscribe(event =>{
      const uuid = event.json().file
      this.mainuser.update({
        profilePic: uuid
      })
      
    })
     await this.presentAlert('Ok!', 'Votre profil a été modifier!')

    this.router.navigate(['/tabs'])
  }

 
}