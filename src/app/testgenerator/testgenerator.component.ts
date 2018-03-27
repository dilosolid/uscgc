import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Http,Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-testgenerator',
  templateUrl: './testgenerator.component.html',
  styleUrls: ['./testgenerator.component.css']
})
export class TestgeneratorComponent implements OnInit {

  currentUser: any = null;
  testname : string  = '';
  questions: string = '10';
  category : boolean[] = [];

  InfoMessage: string = '';
  ShowInfo:    number = 0;

  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { }

  ngOnInit() {
    //this.auth.getAuthState().subscribe((user) => {
      this.currentUser = this.auth.getCurrentUser();;      
    //});    
    this.selectCheckboxes(true);
  }
  
  SelectAll() {
    this.selectCheckboxes(true);
  }

  unSelectAll() {
    this.selectCheckboxes(false);
  }

  selectCheckboxes(selected: boolean) {
    for (var i = 0; i < 24; i++) 
      this.category[i] = selected;     
  }

  generateTest() {
    
    if(this.testname.length == 0) {        
      this.showMsg(2,"Please fill the 'Test Name' field.");
      return;
    }

    if(this.questions.length == 0) {        
      this.showMsg(2,"Please select 'Number of questions' field.");
      return;
    }

    let categoriesSelected = false;
    let categories = '';

    for (var i = 0; i < 24; i++){
       if(this.category[i]) {
          categories += i+1 + ',';
          categoriesSelected = true;
       }
    }

    categories = categories.substr(0, categories.length-1); 

    if(!categoriesSelected) {        
      this.showMsg(2,"Please select atleast one category");
      return;
    }        
        
    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => {
        this._http.post(this._globalService.getGenerateTestPath(), { idtoken, testname:this.testname.trim(), questionscount:this.questions, categories }, { withCredentials: true } ).map((response:Response) => {            
          return response.json();
        }).subscribe((response) => {                                                         
          if(response.status == 1){
            //this.ShowInfoMessage(1,response.msg);
            this.angulartics2.eventTrack.next({ action: 'TestName: ' + this.testname + ' - Number of questions: ' + this.questions, properties: { category: 'GenerateTest', label: 'GenerateTest' }});
            this.router.navigate(['question'], { queryParams: { } });
          }
          else {
            this.showMsg(2,response.msg);
          }
        }, (err) => { 

        });
      });
    }            
  }

  showMsg(showInfo, infoMessage){
      this.ShowInfo = showInfo;
      this.InfoMessage = infoMessage;
      setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }


}

