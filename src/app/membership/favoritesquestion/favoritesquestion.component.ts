import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-favoritesquestion',
  templateUrl: './favoritesquestion.component.html',
  styleUrls: ['./favoritesquestion.component.css']
})
export class FavoritesquestionComponent implements OnInit, OnDestroy {

  gotData:     boolean = false;
  currentUser: any = null;	
  maxitems:    number = 5;
  offset:      number = 0;  
  InfoMessage: string = '';
  ShowInfo:    number = 0;
  Questions = [];
  page: number = 0;
  sub: object  = {};
  pagesInfo    = [];
  
  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 

  }

  ngOnInit() {    
    this.currentUser = this.auth.getCurrentUser();
    this.refreshAll();    
  }

  ngOnDestroy() {    
    //this.sub.unsubscribe();
  }

  paginationClick(){
    this.gotData = false;
  }

  refreshAll() {
    this.sub = this.route.queryParams.subscribe(params => {        
        this.maxitems = +params['maxitems'] || 10; 
        this.offset   = +params['offset']   || 0;  

        this.refreshQuestions();
        if(this.currentUser) {
          this.currentUser.getIdToken().then((idtoken) => {
            this._globalService.getPaginationLinks(idtoken,'/favoritesquestion/',this._globalService.getFavQuestionsPath(),this.maxitems, 0, (pagesInfo) => {          
              this.pagesInfo = pagesInfo;
              this.gotData = true;
            });        
          });
        }
      });      
  }

  refreshQuestions() {
    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => {
        let path = this._globalService.getFavQuestionsPath();
        let requestUrl = `${path}/max/${this.maxitems}/offset/${this.offset}`;
        this._http.post(requestUrl, {idtoken}, { withCredentials: true } ).map((response:Response) => {            
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
  }

  deleteRow(id:string) {  
    this.currentUser.getIdToken().then((idtoken) => {
      this._http.post(this._globalService.getDelFavQuestionsPath() + id, {idtoken}, { withCredentials: true } ).map((response:Response) => {            
        return response.json();
      }).subscribe((response) => {                     
          if(response.status == 1) {
            this.angulartics2.eventTrack.next({ action: 'Deleted Question: ' + id, properties: { category: 'FavoritesQuestions', label: 'Delete Question' }});
            this.ShowInfo = 1;       
            this.InfoMessage = response.msg;                  
            this.refreshAll();
          }
          else{
            this.ShowInfo = 2;       
            this.InfoMessage = response.msg;
          }    
          setTimeout(() => { this.ShowInfo = 0; }, 5000);
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
