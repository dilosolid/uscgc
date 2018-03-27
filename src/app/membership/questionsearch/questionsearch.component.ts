import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-questionsearch',
  templateUrl: './questionsearch.component.html',
  styleUrls: ['./questionsearch.component.css']
})
export class QuestionsearchComponent implements OnInit {

  showLoading:  boolean = false;
  currentUser:  any = null;
  searchTerm:   string = '';
  searchstring: string = '';
  maxitems:     number = 5;
  offset:       number = 0;  
  InfoMessage:  string = '';
  ShowInfo:     number = 0;
  Questions     = [];
  page: number  = 0;
  sub: object   = {};
  pagesInfo     = [];

  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 
    
  }
  
  ngOnInit() {
    this.auth.getAuthState().subscribe((user) => {
      this.currentUser = user;
      this.showLoading = true;
      this.refreshAll();
    });    
  }

  ngOnDestroy() {    
    //this.sub.unsubscribe();
  }

  paginationClick(){
	  this.showLoading = true;
  }

  showMsg(ShowInfo, InfoMessage) {
    this.showLoading = false;
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }

  SearchQuestion() {    
    this.showLoading = true;
    if(this.searchstring.length > 3) {
      this.angulartics2.eventTrack.next({ action: 'Searched Term: ' + this.searchstring, properties: { category: 'Question Search', label: 'Search ' + this.searchstring }});    
      this.refreshAll();    
    }
    else 
      this.showMsg(2,'Search term is to short');    
  }

  refreshAll() {
    
    this.sub = this.route.queryParams.subscribe(params => {       
      this.searchTerm = params['term']      || this.searchstring;  
      this.maxitems   = +params['maxitems'] || 10; 
      this.offset     = +params['offset']   || 0;  

      if(this.searchTerm.length > 3 ){
        
        this.refreshQuestions(this.searchTerm);
        let callUrl = this._globalService.getQuestionSearchPath();

        if(this.currentUser) {
          this.currentUser.getIdToken().then((idtoken) => {
            this._http.post(callUrl + 'count', {idtoken, searchstring:this.searchTerm}, { withCredentials: true } ).map((response:Response) => {            
                return response.json();
            }).subscribe((response) => {                                                         
                var numOfPages = response.map(obj => {      
                                  
                    if(obj.count == '0') 
                      this.showMsg(2,'No result found');                

                    return Math.ceil(obj.count / this.maxitems);
                });                     

                this.showLoading = false;
                this.pagesInfo = [];
                for(var i = 0; i < numOfPages; i++) 
                  this.pagesInfo.push({route:'/questionsearch/',searchTerm:this.searchTerm,maxitems:this.maxitems,offset:i*this.maxitems}); 
            }, (err) => {
                
            }); 
          });
        } 
      }
      else {
        this.showLoading = false;
      }   
    });      
  }

  refreshQuestions(searchTerm) {
    this.currentUser.getIdToken().then((idtoken) => {
      let path = this._globalService.getQuestionSearchPath();
      let requestUrl = `${path}max/${this.maxitems}/offset/${this.offset}`;
      this._http.post(requestUrl, {idtoken, searchstring:searchTerm}, { withCredentials: true } ).map((response:Response) => {            
        return response.json();
      }).subscribe((response) => {                     
          this.Questions = response;
      }, (err) => {
          this.ShowInfo = 2;       
          this.InfoMessage = 'Could not get data from server';      
          setTimeout(() => { this.ShowInfo = 0; }, 5000);  
      }); 
    });
  }
  
  ShowQuestion(question_id) {
    this.router.navigate(['/question'], { queryParams: { id:question_id } });
  }

}
