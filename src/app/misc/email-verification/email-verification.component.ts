import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  currentUser: any = null;
  emailVerified: boolean = null;
  isAnonymous: boolean = null;
  showComponent: boolean = null;

  constructor(private auth: AuthService, private angulartics2: Angulartics2) { }

  ngOnInit() {    
    this.setup();              
    this.auth.getIsPayUser().subscribe((isPayUser: boolean) => {                       
      this.setup();              
    });    	    
  }

  setup() {
    this.currentUser = this.auth.getCurrentUser(); 
    //console.log(this.currentUser);
    this.emailVerified = this.currentUser.emailVerified;
    this.isAnonymous   = this.currentUser.isAnonymous;

    let bGotProvider = false;
    this.currentUser.providerData.map((obj) => {
      if(obj.providerId == 'facebook.com' || obj.providerId == 'google.com')
        bGotProvider = true;
    });

    if((!this.emailVerified && !this.isAnonymous))
        this.showComponent = true;

    if(bGotProvider)
      this.showComponent = false;
  }

  Hide(){
    this.showComponent = false;
    this.angulartics2.eventTrack.next({ action: 'Email Notification reminder was closed', properties: { category: 'EmailVerification', label: '' }});
  }

  sendEmalVerication(){    
    this.currentUser.sendEmailVerification().then(() => {
      this.Hide();
    }, (error) => {                
      this.angulartics2.eventTrack.next({ action: 'Email verification was resend to ' + this.currentUser.email , properties: { category: 'EmailVerification', label: 'Resend Email Verification' }});
    });              
  }

}
