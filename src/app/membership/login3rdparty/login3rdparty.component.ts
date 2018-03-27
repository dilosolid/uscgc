import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-login3rdparty',
  templateUrl: './login3rdparty.component.html',
  styleUrls: ['./login3rdparty.component.css']
})
export class Login3rdpartyComponent implements OnInit {

  user = null;
  InfoMessage: string = '';
  ShowInfo:    number = 0;
  img_path_google:    string = '';
  img_path_facebook:  string = '';

  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 

  }

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
    this.img_path_google   = this._globalService.getImagesPath() + 'misc/btn_google_light_normal_ios.svg';    
    this.img_path_facebook = this._globalService.getImagesPath() + 'misc/FB-f-Logo__blue_50.png'; 

    if(!this.user.isAnonymous) {
      this.auth.getAuth().getRedirectResult().then((result)=>{                    
                
        if(result.user && result.user.uid) {                            
          let name     = result.user.displayName ? result.user.displayName : '';
          let email    = result.user.email ? result.user.email : '';
          let provider = result.additionalUserInfo && result.additionalUserInfo.providerId ? result.additionalUserInfo.providerId : '';

          result.user.getIdToken().then((idtoken) => {
            this._http.post(this._globalService.getLoginUrl(), { idtoken, name, email, provider }, { withCredentials: true }).map((response:Response) => {            
              return response.json();
            }).subscribe((response) => {             
              if(response.status == 1) {
                this.showMsg(1, 'Login Success! Please Wait');          
                this.angulartics2.eventTrack.next({ action: 'Email: ' + email, properties: { category: 'LogIn', label: 'Log In With: ' + provider }});   
                setTimeout(() => {                               
                  this.router.navigateByUrl(`/testgenerator`);
                }, 1000);  
              }            
            });
          }).catch((error) => {
            //console.log('error:' + error);
          });                        
        }      
      }).catch((error) =>{        
        this.showMsg(2, error.message);        
      });
    }
  }

  loginWithFacebook() {        
    this.auth.loginWithFacebook();          
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 10000);  
  }

}
