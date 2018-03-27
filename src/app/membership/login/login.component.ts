import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  user = null;

  Email:       string = '';
  Password:    string = '';
  InfoMessage: string = '';
  ShowInfo:    number = 0;
  
  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService) { 
    
  }

  ngOnInit() {            
    this.user = this.auth.getCurrentUser();    

    var LogInBtn = document.querySelector('#LogInBtn');
    if(LogInBtn) {
      var clicks   = Observable.fromEvent(LogInBtn, 'click');
      var result   = clicks.throttleTime(5000);
      result.subscribe((x) => {      
        this.logIn();
      });
    }    
  }  

  
  logIn(){      //log in with email and password
    if(this.Email.length == 0){                  
      this.showMsg(2, 'Email is Empty');      
      return;
    }

    if(this.Password.length == 0){            
      this.showMsg(2, 'Password is Empty');      
      return;
    }
    
    this.auth.signInWithEmailAndPassword(this.Email, this.Password)
    .then((obj) => {                  
      if(obj && obj.uid) { 
        this.showMsg(1, 'Login Success! Please Wait');          
        setTimeout(() => {                               
          this.router.navigateByUrl(`/`);
        }, 2000);                
      }
    }).catch((e) => {                  
      this.showMsg(2, e.message);          
    });  
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 10000);  
  }
}
