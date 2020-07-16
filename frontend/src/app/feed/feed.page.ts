import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserService } from '../user.service';
import { AlertController, ModalController } from '@ionic/angular'

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx'

import { AngularFireFunctions} from '@angular/fire/functions'



export class SharedModule {}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
 
  currentposition;
  height;
  minimumThreshold;
  startPosition;

  mainusers: AngularFirestoreDocument
  
  sub
  username: string
  profilePic: string
  userPosts
  posts

  
 
  constructor(  
    private aff:AngularFireFunctions, 
    private nativePageTransitions: NativePageTransitions, 
    private modalController: ModalController, 
    private afs: AngularFirestore, 
    private user: UserService, 
    private router: Router, 
    private alertController: AlertController  ) {

  this.mainusers = afs.doc(`users/${user.getUID()}`)
  this.sub = this.mainuser.valueChanges().subscribe(event =>{

    this.username = event.username
    
    this.profilePic = event.profilePic
    
   
      
    
  })
}
  

ngOnDestroy() {
    this.sub.unsubscribe()
}

  
ngOnInit() {
      const posts = this.aff.httpsCallable('posts')
      this.sub = posts({}).subscribe(data =>{
        this.posts = data
      })
}
    



  


































////the other things:









async lets() {
    const alert = await this.alertController.create({
      header: 'En cours de création...',
      message: 'les story arrivent bientôt il a des mises a jours toutes les semaines, donner nous des idées',
      buttons: [
        {
          text: 'vous avez des idées?',
          
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(['/option'])
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  
  

async flipPage() {
  
    
      const alert = await this.alertController.create({
        header: 'bientot disponible',
        message: "il n'y a pas encore assez d'annonce pour cette option ",
        buttons: ['Cool!']
     
  
    });

    await alert.present();

  
  
  
  
  
 

}







































///opensheet

flipfuture() {
let options: NativeTransitionOptions = {
  direction: 'up' ,
  duration: 600,

}
this.nativePageTransitions.flip(options);
this.router.navigate(['/menu'])}
open(){
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";


}
close() {
  this.currentposition = 0; 
  this.startPosition = 0;
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";
}

touchMove(evt: TouchEvent) {
  if(this.startPosition == 0 ) {
    this.startPosition = evt.touches[0].clientY;

  }
  this.height = document.querySelector(".bottomSheet").clientHeight;
  var y = evt.touches[0].clientY
  this.currentposition = y - this.startPosition;

  if(this.currentposition > 0 && this.startPosition > 0 ) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentposition + "px,0px)";
  }
}
touchEnd() {
  this.minimumThreshold = this.height - 130;

  if(this.currentposition < this.minimumThreshold) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
  }
  else {
    this.close();
  }
}



///{const getFeed = this.aff.httpsCallable('getFeed1')
  //this.sub = getFeed({}).subscribe(data =>{
   // this.posts = data
 // })

}
