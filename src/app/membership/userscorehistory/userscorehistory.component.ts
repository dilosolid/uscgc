import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-userscorehistory',
  templateUrl: './userscorehistory.component.html',
  styleUrls: ['./userscorehistory.component.css']
})
export class UserscorehistoryComponent implements OnInit {

  gotData:     boolean = false;
  currentUser: any = null;	
  sub:         object = {};
  maxitems:    number = 5;
  offset:      number = 0;  
  userScores:  object = [];
  pagesInfo    = [];

  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService) { 

  }

  ngOnInit() {
    //this.auth.getAuthState().subscribe((user) => {
      this.currentUser = this.auth.getCurrentUser();;
      this.refreshAll();
    //});
  }

  paginationClick(){
	  this.gotData = false;
  }

  refreshAll() {
    this.sub = this.route.queryParams.subscribe(params => {        
        this.maxitems = +params['maxitems'] || 10; 
        this.offset   = +params['offset']   || 0;  
        this.getUserScore(this.maxitems, this.offset);
        if(this.currentUser) {
          this.currentUser.getIdToken().then((idtoken) => {
            this._globalService.getPaginationLinks(idtoken, '/userscorehistory/',this._globalService.getQuestionUserScore(),this.maxitems, 0, (pagesInfo) => {          
              this.pagesInfo = pagesInfo;
              this.gotData = true;
            });        
          });
        }
      });      
  }

  getUserScore(maxitems,offset) {      
      let QuestionUserScorePath  = this._globalService.getQuestionUserScore() + maxitems + '/' + offset;      
      
      if(this.currentUser) {
        this.currentUser.getIdToken().then((idtoken) => {
          let path = this._globalService.getQuestionUserScore();
          let requestUrl = `${path}/max/${this.maxitems}/offset/${this.offset}`;
          this._http.post(requestUrl, {idtoken}, { withCredentials: true }).map((response:Response) => {            
            return response.json();
          }).subscribe((response) => {                                                                                       
              this.userScores = response;              
          }, (err) => {
              
          });
        });
      }
  }

  deleteRow(id:string) {                  
      this._http.post(this._globalService.getQuestionUserScore() + id, { withCredentials: true }).map((response:Response) => {            
        return response.json();
      }).subscribe((response) => {                                                                                       
          this.refreshAll();
      }, (err) => {
          
      });
  }

}
