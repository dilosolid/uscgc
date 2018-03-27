import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  InfoMessage: string = '';
  ShowInfo:    number = 0;
  Email:       string = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  recoverLossPassword() {
    if(this.Email.length == 0){                  
      this.showMsg(2, 'Email is Empty');      
      return;
    }

    this.auth.getAuth().sendPasswordResetEmail(this.Email).then(() => {
      // Email sent.
      this.showMsg(1, 'Email sent successfully.');   
    }, function(error) {
      // An error happened.
      this.showMsg(2, 'Failed to send recovery Email.');   
    });
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }
}
