import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name:    string = '';
  email:   string = '';
  subject: string = 'support';
  message: string = '';

  InfoMessage: string = '';
  ShowInfo:    number = 0;

  constructor(private _globalService: GlobalService, private _http: Http, private angulartics2: Angulartics2) { }

  ngOnInit() {
    var SubmitInquiryBtn = document.querySelector('#SubmitInquiry');
    if(SubmitInquiryBtn) {
      var clicks   = Observable.fromEvent(SubmitInquiryBtn, 'click');
      var result   = clicks.throttleTime(5000);
      result.subscribe((x) => {      
        this.submitInquiry();
      }, (err) => {        
        
      }, () => {

      });
    }    
  }

  submitInquiry() {
        
    if(this.name.length == 0) {        
      this.ShowInfoMessage(2,"Please fill the 'Name' field.");
      return;
    }
    
    if(this.email.length == 0) {      
      this.ShowInfoMessage(2,"Please fill the 'Email' field.");
      return;
    }

    if(this.subject.length == 0) {
      this.ShowInfoMessage(2,"Please fill the 'Subject' field.");
      return;
    }
    
    if(this.message.length == 0) {
      this.ShowInfoMessage(2,"Please fill the 'Message' field.");
      return;
    }    

    this._http.post(this._globalService.getSupportUrl(), { name:this.name , email:this.email, subject:this.subject , message:this.message } , { withCredentials: true } ).map((response:Response) => {            
      return response.json();
    }).subscribe((response) => {                                                         
      if(response.status == 1){
        this.angulartics2.eventTrack.next({ action: 'New Support Request Email: ' + this.email, properties: { category: 'Contact', label: 'Contact' }});
        this.ShowInfoMessage(1,response.msg);
      }
      else {
        this.ShowInfoMessage(2,response.msg);
      }
    }, (err) => {
        
    });        
  }

  ShowInfoMessage(showInfo, infoMessage){
      this.ShowInfo = showInfo;
      this.InfoMessage = infoMessage;
      setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }

}
