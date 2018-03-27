import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnChanges {

  currentUser: any = null;	

  @Output() showQuestionMenu = new EventEmitter();
  @Output() isActive1 = new EventEmitter();
  @Output() isActive2 = new EventEmitter();
  @Output() isActive3 = new EventEmitter();
  @Output() isActive4 = new EventEmitter();

  @Input() refreshQuestion: boolean;  
  gotData : boolean;
  @Output() onGotData = new EventEmitter();

  isPayUser: boolean = false;
  isOnline : boolean = true;
  

  id: number;  
  questionAlreadyAdded : boolean = false;
  question: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  answer  : string;  
  category: string;
  name    : string;

  answerbgColorA: string;
  answerbgColorB: string;
  answerbgColorC: string;
  answerbgColorD: string;
  user_answer : string = '';
  showNextButton: boolean = false;
  showScore: boolean = false;
  img_path: string = '';

  prevQuestionList: number[] = [];
  nextQuestionList: number[] = [];

  InfoMessage: string = '';
  ShowInfo:    number = 0;
  sub: object  = {};

  categoryParams: number;
  
  correctCount:        number = 0;
  inCorrectCount:      number = 0;
  score:               number = 0;
  us_test_name:        string = '';
  us_questions:        string = '';
  us_question_count:   number = 0;
  us_current_question: number = 0;
  us_current_question_index: number = 0;  

  currentQuestionIsCorrect: boolean = false;
  questionIDFromParam: boolean = false;

  constructor(private _globalService: GlobalService, private _http: Http, private route: ActivatedRoute, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 
    
  }

  ngOnInit() {       
    this.auth.getIsPayUser().subscribe((isPayUser: boolean) => {                 
      this.currentUser = this.auth.getCurrentUser();     
      this.isPayUser = isPayUser;                   
    });    	   
  }

  ngOnChanges(changes: SimpleChanges) {              
    this.currentUser = this.auth.getCurrentUser();
    this.isPayUser   = this.auth.isPayUser();
    
    this.sub = this.route.queryParams.subscribe(params => {                    
      let id = +params['id'] || 0;                       //get question by question id      
      this.categoryParams = +params['category'] || 0;    //get question by category id      
      
      if(id != 0)
        this.questionIDFromParam = true;

      this.getUserScore(() => {                
        if(id == 0 && this.categoryParams == 0 && this.us_current_question > 0) 
          this.getQuestion(this.us_current_question, 0);                    
        else 
          this.getQuestion(id,this.categoryParams);                                          
        
      });          
    });     
  }

  NextQuestion(e) {  
    this.gotData = false;  
    e.preventDefault(); //prevent page from refreshing  
  
    this.us_current_question_index++;
    this.prevQuestionList.push(this.id);                    //push add element at the end of the array
    this.getQuestion(this.nextQuestionList.shift(),this.categoryParams);      //shift remove the first element of the array and returns it
    this.showNextButton = false;
    this.ShowInfo = 0;                 
  }

  PrevQuestion(e) {     
    this.gotData = false;
    e.preventDefault(); //prevent page from refreshing       

    this.us_current_question_index--;
    this.nextQuestionList.unshift(this.id);             //unshift add element at the beggining o the array
    this.getQuestion(this.prevQuestionList.pop(),this.categoryParams);    //pop remove the last element from the array and return it
    this.showNextButton = false;    
  }

  SaveToFavorites(e) {      
    e.preventDefault(); //prevent page from refreshing    
    
    if(this.currentUser.isAnonymous || !this.isPayUser) {
      this.router.navigate(['/membershipinfo'], { queryParams: { } });
      return;
    }

    this.currentUser.getIdToken().then((idtoken) => {
      this._http.post(this._globalService.getSaveQuestionToFavPath() + this.id, {idtoken} , { withCredentials: true } ).map((response:Response) => {            
        return response.json();
      }).subscribe((response) => {     
        this.isOnline = true;           
        if(response.status == 1)                    
          this.showMsg(1, response.msg);        
        else
          this.showMsg(2, response.msg);        

      }, (err) => {                  
        if(err.status == 0) {
          this.showMsg(2, 'Failed to connect to the server');      
          this.isOnline = false;
        }
      });    
    });    
  }

  RemoveQuestion(e) {        
    e.preventDefault(); //prevent page from refreshing

    if(this.currentUser.isAnonymous || !this.isPayUser) {
      this.router.navigate(['/membershipinfo'], { queryParams: { } });
      return;
    }
    
    this.currentUser.getIdToken().then((idtoken) => {
      this._http.post(this._globalService.getSaveQuestionToBlacklistPath() + this.id, {idtoken} , { withCredentials: true } ).map((response:Response) => {            
        return response.json();
      }).subscribe((response) => {   
            this.isOnline = true;                     
            if(response.status == 1)            
              this.showMsg(1, 'Question saved to your blacklist.');          
        }, (err) => {                  
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;
          }
        });    
    });        
  }

  ClearScore(e) {      
    e.preventDefault(); //prevent page from refreshing
/*
    if(this._globalService.LoggedUserInfo.isLogged == 0){
      this.router.navigate(['/membershipinfo'], { queryParams: { } });
      return;
    }    
*/    
    if((this.correctCount > 0 || this.inCorrectCount > 0) || this.us_test_name.length > 0) {      
      let QuestionUserScorePath  = this._globalService.getQuestionUserScore() + 'clearscore/';

      this.us_test_name = '';

      if(this.currentUser) {
        this.currentUser.getIdToken().then((idtoken) => {
          this._http.post(QuestionUserScorePath, {idtoken}, { withCredentials: true }).map((response:Response) => {            
            return response.json();
          }).subscribe((response) => {  
              this.isOnline = true;                                                                                        
              if(response.status == 1) {                
                this.correctCount   = 0; 
                this.inCorrectCount = 0;                   
                this.getUserScore(() => {                                  
                    this.getQuestion(0,this.categoryParams);                                
                });  
              }
              else 
                this.showMsg(2, response.msg);                          
              
          }, (err) => {
            if(err.status == 0) {
              this.showMsg(2, 'Failed to connect to the server');      
              this.isOnline = false;
            }
          });
        });
      }
      else {
        this.correctCount   = 0;
        this.inCorrectCount = 0;
      }
    }    
    else {
      this.showMsg(1, 'Nothing to reset');                            
    }
  }

  clickAnswer(event: any, user_answer: string){              

    event.preventDefault(); //prevent page from refreshing
    
    if(!this.showScore || this.us_test_name.length == 0) {
      if(this.answer == user_answer){        
        this.setAnswer(true,user_answer);

        if(this.us_test_name.length == 0)
          this.setAnswerColor(user_answer,'correctAnswerbgColor');                               
        else
          this.setAnswerColor(user_answer,'previousAnswerbgColor');                               
      }
      else {
        this.setAnswer(false,user_answer);

        if(this.us_test_name.length == 0) {
          this.setAnswerColor(user_answer,'wrongAnswerbgColor');      
          this.setAnswerColor(this.answer,'correctAnswerbgColor');                               
        }
        else
          this.setAnswerColor(user_answer,'previousAnswerbgColor');                               
      }              
      this.showNextButton = true;      
    }
    else {      
      this.showMsg( 2, 'The test is over, you cannot change your asnwer.');
    }

    if(((this.correctCount + this.inCorrectCount) == this.us_question_count) && this.us_question_count > 0) 
      this.showScore = true;                                     
  }

  setAnswerColor(selection: string, style:string) {            
    if(selection == 'A')
      this.answerbgColorA = style;         
    else if(selection == 'B')
      this.answerbgColorB = style;       
    else if(selection == 'C')
      this.answerbgColorC = style;         
    else if(selection == 'D')
      this.answerbgColorD = style; 
  }    

  getQuestionLastAnswer(questionid, callback) {
    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => {         
        let path = this._globalService.getQuestionsHistoryPath();
        let requestUrl = `${path}getlastanswer/${questionid}`;       

        this._http.post(requestUrl, {idtoken}, { withCredentials: true }).map((response:Response) => {            
            return response.json();
        }).subscribe((response) => {                                                         
          this.isOnline = true;                                                                         
          response.map((obj) => {
            callback(obj);          
          });
        }, (err) => {                  
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;   
          }
        }); 
      });
    }
  }

  getQuestion(id, categoryParam) { 
    
    let url = this._globalService.getQuestionUrl();
    let showblacklisted = 0;

    if(categoryParam > 0)
      url = this._globalService.getCategoryUrlPath() + categoryParam;          

    if(id > 0) {
      url = this._globalService.getQuestionByIdUrlPath() + id;
      showblacklisted = 1;
    }

    this.questionAlreadyAdded = false;

    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => { 
        this._http.post(url, {idtoken, showblacklisted }, { withCredentials: true }).map((response:Response) => {            
          return response.json();
        }).subscribe((response) => { 
              
          response.map(obj => {
            this.isOnline = true;   

            let {id, question,answer_a, answer_b, answer_c, answer_d, answer, category, name, image_name, img_path, sub_category} = obj;     
                    
            this.id = id;
            this.question = question;
            this.answer_a = answer_a;
            this.answer_b = answer_b;
            this.answer_c = answer_c;
            this.answer_d = answer_d;
            this.answer   = answer;
            this.category = category;        
            this.name     = name;

            if(image_name.length > 0)
              this.img_path = this._globalService.getImagesPath() + img_path;
            else
              this.img_path = '';

            if(sub_category)
              this._globalService.setQuestionPath(sub_category);
                  
            this.answerbgColorA = '';
            this.answerbgColorB = '';
            this.answerbgColorC = '';
            this.answerbgColorD = '';

            if(category == 'deck' || category == 'gmdss' )
              this.isActive1.emit();
            else if(category == 'deck 2014')
              this.isActive2.emit();
            else if(category == 'engine')
              this.isActive3.emit();
            else if(category == 'engine 2014')
              this.isActive4.emit();
                    
            console.log('Current Q Id:' + id + " - Correct Answer", this.answer);               
                        
            if(this.isPayUser) {                 
              this.getQuestionLastAnswer(id, (obj) => {
                if(obj.test_name == this.us_test_name || this.questionIDFromParam)            
                  this.setAnswerColor(obj.user_answer,'previousAnswerbgColor');                             
              });                        
            }
                      
            this.getCurrentTestscore();                      
            this.gotData = true;        
            this.onGotData.emit();                           
          });
          
        }, (err) => {                  
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;
          }
        });  
      });
    }
  }  

  getCurrentTestscore() {
    if(this.currentUser) {
      this.currentUser.getIdToken().then((idtoken) => {            
        this._http.post(this._globalService.getQuestionUserScore() + 'currenttestscore', {idtoken}, { withCredentials: true } ).map((response:Response) => {            
            return response.json();
        }).subscribe((response) => {                                                         
          this.isOnline = true;                                                                         
          response.map((obj) => {                            
            this.correctCount   = obj.correct;
            this.inCorrectCount = obj.wrong;          
          
            if((obj.correct + obj.wrong) == this.us_question_count) 
              this.showScore = true;                                                  
          });
        }, (err) => {                  
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;   
          }
        }); 
      });
    } 
  }

  setAnswer(correct, useranswer){                
    if(!this.questionAlreadyAdded)
    {                
      this.user_answer = useranswer;

      this.currentQuestionIsCorrect = correct;

      if(correct) {          
        this.showMsg(1, 'Correct!');                       
        this.SaveQuestionToHistory(this.id,useranswer);          
        this.correctCount++;
      }
      else {
        this.showMsg(2, 'Incorrect!');                    
        this.SaveQuestionToHistory(this.id,useranswer);
        this.inCorrectCount++;
      }        
    }          
    this.questionAlreadyAdded = true;
  }

  SaveQuestionToHistory(questionid, useranswer) {    
    if(this.currentUser) {      
      this.currentUser.getIdToken().then((idtoken) => {
        this._http.post(this._globalService.getQuestionsHistoryPath(), {idtoken, questionid, useranswer},  { withCredentials: true } ).map((response:Response) => {            
            return response.json();
        }).subscribe((response) => {                                                                   
          this.isOnline = true;                                                                         
        }, (err) => {                  
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;   
          }
        }); 
      });
    }
  }
  
  getUserScore(callback) {        
    let QuestionUserScorePath  = this._globalService.getQuestionUserScore() + 'active/';    
    if(this.currentUser) {            
      this.currentUser.getIdToken().then((idtoken) => {        
        this._http.post(QuestionUserScorePath, {idtoken}, { withCredentials: true }).map((response:Response) => {            
          return response.json();
        }).subscribe((response) => {                                
          response.map((userObj) => {              
              this.isOnline = true;                 
              this.us_test_name        = userObj.test_name;
              this.us_questions        = userObj.questions;
              this.us_question_count   = userObj.question_count;
              this.us_current_question = userObj.current_question;                                                
              this.splitQuestions(this.us_questions, userObj.current_question)   
                            
              if(this.us_test_name.length > 0)             
                this.showQuestionMenu.emit(false);              
              else
                this.showQuestionMenu.emit(true);
          });
          callback();

        }, (err) => {                                                                                                       
          if(err.status == 0) {
            this.showMsg(2, 'Failed to connect to the server');      
            this.isOnline = false;
          }
        });
      });
    }
    else{
      this.getQuestion(0,this.categoryParams);
    }
  }

  getScoreForTemplate() {
    return (this.correctCount == 0 && this.inCorrectCount == 0) ? 0 : (((((this.correctCount+this.inCorrectCount) - this.inCorrectCount) / (this.correctCount+this.inCorrectCount)) * 100 ));
  }

  splitQuestions(questions: string, current_question: string) {

      if(questions.indexOf(current_question) >= -1)
      {
        let questionsArr = questions.split(',');

        let putQuestionInNext = false
        let index = 0;
        questionsArr.forEach((question) => {

          index++;
          if(current_question == question) {
            putQuestionInNext = true;
            this.us_current_question_index = index;
          }
          else {
            if(putQuestionInNext){              
              if(question)
                this.nextQuestionList.push(Number.parseInt(question));
            }
            else{              
              if(question)
                this.prevQuestionList.push(Number.parseInt(question));
            }
          }              
        });
      }         
  }  

  goToGenerateNewTest(){
    this.router.navigate(['/testgenerator'], { queryParams: { } });
  }  

  showMsg(ShowInfo, InfoMessage) {
    this.ShowInfo    = ShowInfo;       
    this.InfoMessage = InfoMessage;      
    setTimeout(() => { this.ShowInfo = 0; }, 5000);  
  }

}




