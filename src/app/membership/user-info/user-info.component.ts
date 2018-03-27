import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth.service';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  currentUser:  any = null;
  OldPassword:  string = '';
  NewPassword:  string = '';
  NewPassword2: string = '';
  InfoMessage:  string = '';
  ShowInfo:     number = 0;
  isRecurringPayUser: boolean = false;
  bshowMonthlyPayments: boolean = false;

  constructor(private _globalService: GlobalService, private _http: Http, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.isRecurringPayUser = this.auth.isRecurringPayUser(); 
    var ChangePasswordBtn =  document.querySelector('#ChangePasswordBtn');

    if(ChangePasswordBtn) {      
      var clicks = Observable.fromEvent(ChangePasswordBtn, 'click');
      var result = clicks.throttleTime(5000);
      result.subscribe((x) => {      
        this.changePassword();
      });
    }
  }

  sendEmalVerication(){
    this.currentUser.sendEmailVerification().then(() => {
      this.showMsg(1, 'Verification email was send successfully.');          
    }, (error) => {                
      this.showMsg(2, 'There was an error sending the verification email, Try again later');          
    });              
  }

  showMonthlyPayments(){
    this.bshowMonthlyPayments = true;
  }

  stopMonthlyPayments(){
    if(this.currentUser) {    
      this.currentUser.getIdToken().then((idtoken) => {
        let requestUrl = this._globalService.getPaymentPath() + '/cancelrecurringservice';
        this._http.post(requestUrl, {idtoken}, { withCredentials: true }).map((response:Response) => {            
          return response.json();
        }).subscribe((response) => {                                                         
          
          if(response.status == 1) {
            this.showMsg(1, response.msg);
            this.auth.setRecurringPayUser(false); 
            this.isRecurringPayUser = false;
          }
          else
            this.showMsg(2, response.msg);

        }, (err) => {                            
          this.showMsg(2, 'Failed to connect to the server');                      
        }); 
      });
    }
  }

  changePassword(){

    if(this.OldPassword.length == 0){                  
      this.showMsg(2, 'New Password is Empty');    
      return;
    }

    if(this.NewPassword.length == 0){                  
      this.showMsg(2, 'New Password is Empty');    
      return;
    }

    if(this.NewPassword2.length == 0){                  
      this.showMsg(2, 'New Confirm Password is Empty');    
      return;
    }

    if(this.NewPassword != this.NewPassword2){                  
      this.showMsg(2, 'Password are not equal');    
      return;
    }

    let firebase = this.auth.getFirebaseObj();    
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email,this.OldPassword);
    
    if(credential){
      this.currentUser.reauthenticateWithCredential(credential)
      .then(() => {        
        this.currentUser.updatePassword(this.NewPassword).then(() => {                        
            this.showMsg(1, 'Password change successfully');    
          }, (error) => {            
            this.showMsg(2, error.message);    
          });
      }, (error) => {        
        this.showMsg(2, error.message );    
      });
    }    
  }

  goToPayment() {
    this.router.navigateByUrl(`/payment`);
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }

}
