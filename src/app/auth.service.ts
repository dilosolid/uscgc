import { Injectable }      from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase       from 'firebase/app';
import { Observable }      from 'rxjs/Observable';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalService } from './global.service';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  private bIsPayUser: boolean = false;
  private bIsRecurringPayUser: boolean = false;
  private dataObs$ = new Subject();
  private anonUid = '';

  constructor(public afAuth: AngularFireAuth, private _globalService: GlobalService, private _http: Http) {
   
  }

  getIsPayUser() {
    return this.dataObs$;
  }

  updateIsPayUser(isPayUser: boolean) {    
    this.dataObs$.next(isPayUser);
  }

  load(): Promise<any>{
    return new Promise((resolve, reject) => {                      
      this.authState = this.afAuth.authState;
      this.authState.subscribe(user => {                
        this.bIsPayUser = false;
        if (user) {        
          this.currentUser = user;

          if(user.isAnonymous){
            //console.log('Returning Anonymous User');                                
            this.updateIsPayUser(false);
            
            if(!this.anonUid) //if anonUid is not filled is because the user is in the backend so we can resolve the promise right away
              resolve();      //if anonUid is filler is because is a new anon user but we should not resolve the promise here and wait for the anon user is create in the back end
          }
          else {
            //console.log('Logged In');            
            user.getIdToken().then((idtoken) => {                        
              this._http.post(this._globalService.getLoginUrl() + '/ispayuser', { idtoken }, { withCredentials: true }).map((response:Response) => {            
                return response.json();
              }).subscribe((response) => {                                 

                if(response.status == 1 && response.isRecurringPayUser == true)
                  this.bIsRecurringPayUser = true;

                if(response.status == 1 && response.isPayUser == true)      {
                  this.bIsPayUser = true;                  
                  this.updateIsPayUser(true);                  
                  resolve();
                }
                else {                                  
                  this.updateIsPayUser(false);
                  resolve();
                }
              });            
            }).catch((error) => {                  
              this.updateIsPayUser(false);
              reject(error);
            });                                                  
          }
        } else {               
          this.updateIsPayUser(false);
          this.currentUser = null;        
          this.afAuth.auth.signInAnonymously().then((obj) => {                      
            this.anonUid = obj.uid;
            obj.getIdToken().then((idtoken) => {                        
              this._http.post(this._globalService.getLoginUrl(), { idtoken, name:'anonymous', email:'anonymous@anonymous.com', provider:'anonymous' }, { withCredentials: true }).map((response:Response) => {            
                return response.json();
              }).subscribe((response) => {             
                if(response.status == 1){
                  console.log('Logged in Anonymously Backend');              
                  resolve(true);
                }
              });            
            }).catch((error) => {              
              reject(error);
            });
          }).catch((error) => {            
            reject(error);
          });                 
        }
      },(err) => {              
        reject(err);
      });
    });
  }

  getAuthState() {
    return this.authState;
  }

  getFirebaseObj() {
    return firebase;
  }

  getAuth() {        
    return this.afAuth.auth;
  }

  logOutUser() {
    return this.afAuth.auth.signOut();
  }

  loginWithFacebook() {    
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  loginWithGoogle() {
    this.afAuth.auth.checkActionCode
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  createUserWithEmailAndPass(username, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(username, password);
  }

  signInWithEmailAndPassword(username, password){
    return this.afAuth.auth.signInWithEmailAndPassword(username, password);
  }
  
  getCurrentUser() {
    return this.currentUser;
  }

  isPayUser() {    
    return this.bIsPayUser;
  }

  setPayUser(state: boolean) {
    this.bIsPayUser = state;
  }

  isRecurringPayUser() {    
    return this.bIsRecurringPayUser;
  }

  setRecurringPayUser(state: boolean) {    
    this.bIsRecurringPayUser = state;
  }
}
