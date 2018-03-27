import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-questionhistory',
  templateUrl: './questionhistory.component.html',
  styleUrls: ['./questionhistory.component.css']
})
export class QuestionhistoryComponent implements OnInit {

  gotData:     boolean = false;
  sub: object  = {};
  maxitems:    number = 5;
  offset:      number = 0; 
  userscore:   number = 0;   
  InfoMessage: string = '';
  ShowInfo:    number = 0;
  Questions = [];
  page: number = 0;  
  pagesInfo    = [];
  currentUser: any = null;
  
  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService) { 

  }

  ngOnInit() {
    //this.auth.getAuthState().subscribe((user) => {
      this.currentUser = this.auth.getCurrentUser();;      
      this.refreshAll();
    //});          
  }

  ngOnDestroy() {    
    //this.sub.unsubscribe();
  }

  paginationClick(){
  	this.gotData = false;
  }

  refreshAll() {
    this.sub = this.route.queryParams.subscribe(params => {        
      this.maxitems  = +params['maxitems'] || 10; 
      this.offset    = +params['offset']   || 0;  
      this.userscore = +params['userscore']   || 0;

      this.refreshQuestions();
      if(this.currentUser) {
        this.currentUser.getIdToken().then((idtoken) => {
          this._globalService.getPaginationLinks(idtoken, '/questionhistory/', this._globalService.getQuestionsHistoryPath(), this.maxitems, this.userscore, (pagesInfo) => {                    
              this.pagesInfo = pagesInfo.map((link) => {                
                  return link;
              });
              this.gotData = true;
          });        
        });
      }
    });      
  }

  refreshQuestions() {
    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => {
        this.getQuestionsRequest(idtoken).subscribe((response) => {                     
            this.Questions = response;
        }, (err) => {
            this.ShowInfo = 2;       
            this.InfoMessage = 'Could not get data from server';      
            setTimeout(() => { this.ShowInfo = 0; }, 5000);  
        }); 
      });
    }
  }

  getQuestionsRequest(idtoken: string) {                  
    let path = this._globalService.getQuestionsHistoryPath();
    let requestUrl = `${path}/max/${this.maxitems}/offset/${this.offset}`;    

    if(this.userscore > 0)
      requestUrl += `?userscore=${this.userscore}`;
    
    return this._http.post(requestUrl, {idtoken}, { withCredentials: true } ).map((response:Response) => {            
      return response.json();
    });  
  }
  
  deleteRow(id:string) {      
     this._http.post(this._globalService.getDelQuestionsHistoryPath() + id, { withCredentials: true } ).map((response:Response) => {            
      return response.json();
     }).subscribe((response) => {                     

        if(response.status == 1) {
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
  }

  ShowQuestion(question_id,user_answer) {
    this.router.navigate(['/question'], { queryParams: { id:question_id } });
  }

}
