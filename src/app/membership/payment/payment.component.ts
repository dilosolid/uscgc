import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  ShowInfo: number = 0;
  showLoading: boolean = false;
  showPayBtn:boolean   = false;
  InfoMessage: string  = '';

  ccNo:     string = '';
  expMonth: string = '';
  expYear:  string = '';
  cvv:      string = '';

  name:           string = '';
  addressLine1:   string = '';
  addressLine2:   string = '';
  addressCity:    string = '';
  addressState:   string = '';
  addressZipCode: string = '';
  addressCountry: string = '';
  phone: string = '';

  TCO: any;
  currentUser: any = null;


  constructor(private _globalService: GlobalService, private _http: Http, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 

  }

  ngOnInit() {


    Observable.fromEvent(document.querySelector('#ccNo'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.ccNo = this.ccNo.replace(/[^0-9]/g, '');                  
    });			

    Observable.fromEvent(document.querySelector('#expMonth'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.expMonth = this.expMonth.replace(/[^0-9]/g, '');                  
    });			

    Observable.fromEvent(document.querySelector('#expYear'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.expYear = this.expYear.replace(/[^0-9]/g, '');                  
    });			

    Observable.fromEvent(document.querySelector('#cvv'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.cvv = this.cvv.replace(/[^0-9]/g, '');                  
    });			

    Observable.fromEvent(document.querySelector('#name'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.name = this.name.replace(/[^a-zA-Z'\s]/g, '');                  
    });			


    Observable.fromEvent(document.querySelector('#phone'), 'keyup').debounceTime(500).subscribe((x) => {            
      this.phone = this.phone.replace(/[^0-9\-\s]/g, '');                  
    });			
 
    this.currentUser = this.auth.getCurrentUser();;    

    var payBtn = document.querySelector('#payBtn');
    if(payBtn) {
      var clicks = Observable.fromEvent(payBtn, 'click');
      var result = clicks.throttleTime(1000);
      result.subscribe((x) => {      
        this.payBtn();
      });
    }    

    if(document){
      var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'https://www.2checkout.com/checkout/api/2co.min.js');
      var body = document.getElementsByTagName('body').item(0);

      if(body){
        body.appendChild(script);      
        setTimeout(()=>{
          this.TCO = window["TCO"];
          if(this.TCO){

            let sandbox = 'sandbox';
            if(environment.production)
              sandbox = 'production';            

            this.TCO.loadPubKey(sandbox, () => {
              this.showPayBtn = true;
            });
          }          
        },2000)
      }    
    }    
  }

  payBtn(){
  
    if(this.ccNo.length == 0){                  
      this.showMsg(2, 'Card number is Empty');      
      return;
    }

    if(this.expMonth.length == 0){                  
      this.showMsg(2, 'Expiration month is Empty');      
      return;
    }

    if(this.expYear.length == 0){                  
      this.showMsg(2, 'Expiration year is Empty');      
      return;
    }

    if(this.cvv.length == 0){                  
      this.showMsg(2, 'CVV code is Empty');      
      return;
    }

    if(this.name.length == 0){                  
      this.showMsg(2, 'Name is Empty');      
      return;
    }

    if(this.addressLine1.length == 0){                  
      this.showMsg(2, 'Address line 1 is Empty');      
      return;
    }
/*
    if(this.addressLine2.length == 0){                  
      this.showMsg(2, 'Address line 2 is Empty');      
      return;
    }
*/
    if(this.addressCity.length == 0){                  
      this.showMsg(2, 'City is Empty');      
      return;
    }

    if(this.addressState.length == 0){                  
      this.showMsg(2, 'State is Empty');      
      return;
    }

    if(this.addressZipCode.length == 0){                  
      this.showMsg(2, 'Zip code is Empty');      
      return;
    }

    if(this.addressCountry.length == 0){                  
      this.showMsg(2, 'Country is Empty');      
      return;
    }

    if(this.phone.length == 0){                  
      this.showMsg(2, 'Phone is Empty');      
      return;
    }

    this.showLoading = true;

    if(this.currentUser) {    
      this.currentUser.getIdToken().then((idtoken) => {
        
        let args = {
          sellerId: environment.sellerId,
          publishableKey: environment.publishableKey,
          ccNo:     this.ccNo,
          cvv:      this.cvv,
          expMonth: this.expMonth,
          expYear:  this.expYear
        };

        this.TCO.requestToken((data) => {
            
            let months = 1;
            let requestParams = { idtoken, token:data.response.token.token, months:months, name:this.name, addressLine1:this.addressLine1, addressLine2:this.addressLine2, addressCity:this.addressCity, addressState:this.addressState, addressZipCode:this.addressZipCode, addressCountry:this.addressCountry, phone:this.phone};

            this._http.post(this._globalService.getPaymentPath() + '/payforservice' , requestParams , { withCredentials: true } ).map((response:Response) => {            
              return response.json();
            }).subscribe((response) => {                    
              this.showLoading = false;

              if(response.status == 1){
                this.showMsg(1,response.msg);                                
                this.angulartics2.eventTrack.next({ action: `New Payment: From ${this.name}`, properties: { category: 'Payment', label: 'Payment Success: ' + this._globalService.getEnviromentS() }});
                this.auth.setPayUser(true);
                this.auth.setRecurringPayUser(true); 

                setTimeout(()=>{
                  this.router.navigate(['question'], { queryParams: { } });
                },3000)                 
              }
              else {                
                this.showMsg(2,response.msg);
                this.angulartics2.eventTrack.next({ action: `Payment Error: ${response.msg}`, properties: { category: 'Payment', label: 'Payment Error: ' + this._globalService.getEnviromentS() }});
              }
            }, (err) => { 

            });
            
          },
          (data) => {
            this.showLoading = false;
            this.showMsg(2, data.errorMsg);                                 
            this.angulartics2.eventTrack.next({ action: `Payment Error: ${data.errorMsg}`, properties: { category: 'Payment', label: 'Payment Error: ' + this._globalService.getEnviromentS() }});
          }, 
          args);
         
        
      });
    }                 
  }

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 10000);  
  }

}
