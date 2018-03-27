import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentUser = null;
  Name:        string = '';
  Username:    string = '';
  Password:    string = '';
  Password2:   string = '';
  Email:       string = '';
  InfoMessage: string = '';
  ShowInfo:    number = 0;
  
  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { }

  ngOnInit() {    
    //this.auth.getAuthState().subscribe((user) => this.user = user);
    this.currentUser = this.auth.getCurrentUser();
    var LogInBtn =  document.querySelector('#RegisterBtn');

    if(LogInBtn) {      
      var clicks = Observable.fromEvent(LogInBtn, 'click');
      var result = clicks.throttleTime(5000);
      result.subscribe((x) => {      
        this.register();
      });
    }
  }

  getRegisterRequest() {                  
    return ;  
  }

  register(){            
    if(this.Email.length == 0){                
      this.showMsg(2, 'Email is Empty');    
      return;
    }

    if(this.Password.length == 0){                  
      this.showMsg(2, 'Password is Empty');    
      return;
    }

    if(this.Password2.length == 0){                  
      this.showMsg(2, 'Password 2 is Empty');    
      return;
    }
    
    if(this.Password != this.Password2){                  
      this.showMsg(2, 'Password are not equal');    
      return;
    }     
        
    this.auth.createUserWithEmailAndPass(this.Email, this.Password)
    .then((currentUser) => {                  
      if(currentUser && currentUser.uid) { 
        currentUser.getIdToken().then((idtoken) => {
          let name     = '';
          let email    = this.Email;
          let provider = 'password';
          this._http.post(this._globalService.getRegisterUrl(), { idtoken, name, email, provider }, { withCredentials: true }).map((response:Response) => {            
            return response.json();
          }).subscribe((response) => {             
            if(response.status == 1) {
              this.angulartics2.eventTrack.next({ action: 'Email: ' + email, properties: { category: 'Register', label: 'Create User With Email And Pass' }});            
                 
              currentUser.sendEmailVerification().then(() => {
                this.showMsg(1, response.msg);                  
                setTimeout(() => {                 
                  this.angulartics2.eventTrack.next({ action: 'Send Email Verification On Register: Email: ' + email , properties: { category: 'EmailVerification', label: 'Send Email Verification On Register' }});              
                  this.router.navigateByUrl(`/`);
                }, 2000);    // Email sent.
              }, (error) => {                
                this.showMsg(1, response.msg);                      
              });              
            }
            else            
              this.showMsg(2, response.msg);                               
          });

        }).catch((error) => {
          //console.log('error:' + error);
        });        
      }
    }).catch((e) => {                  
      this.showMsg(2, e.message);          
    });  
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }
}
