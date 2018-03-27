import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject }    from 'rxjs/Subject';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalService {
    private rootUrl:                     string = '';        
    private questionUrlPath:             string = '/api/question/category/1';
    private categoryUrlPath:             string = '/api/question/category/';
    private questionByIdUrlPath:         string = '/api/question/id/';
    private loginUrlPath:                string = '/api/login';        
    private registerUrlPath:             string = '/api/register';
    private SaveQuestionToFavPath:       string = '/api/question/savefavorites/';
    private SaveQuestionToBlacklistPath: string = '/api/question/blacklisted/';
    private FavQuestionsPath:            string = '/api/favoritesquestions/';
    private DelFavQuestionsPath:         string = '/api/favoritesquestions/delete/';
    private BlackListedQuestionsPath:    string = '/api/blacklistedquestions/';
    private DelBlackListedQuestionsPath: string = '/api/blacklistedquestions/delete/';
    private QuestionsHistoryPath:        string = '/api/questionhistory/';
    private DelQuestionsHistoryPath:     string = '/api/questionhistory/delete';
    private QuestionUserScore:           string = '/api/questionuserscore/';
    private DelQuestionUserScore:        string = '/api/questionuserscore/delete';        
    private QuestionSearchPath:          string = '/api/question/search/';
    private SupportPath:                 string = '/api/support';
    private GenerateTestPath:            string = '/api/generatetest';
    private PaymentPath:                 string = '/api/payment';    
    private production:                  boolean = false;


    constructor(private _http: Http) {                 
        this.rootUrl = environment.rootUrl;
        console.log('Root Url:' + this.rootUrl);        
        this.production = environment.production;
    } 
        
    getPaginationLinks(idtoken, callUrl, countUrl, itemsPerPage, userscore, callback) {

        if(userscore > 0)
            countUrl = countUrl + `count?userscore=${userscore}`;
        else
            countUrl = countUrl + 'count';

        this._http.post(countUrl,{idtoken}, { withCredentials: true } ).map((response:Response) => {            
            return response.json();
        }).subscribe((response) => {                                                         
            var numOfPages = response.map(obj => {                                                                                                                                                                                         
                return Math.ceil(obj.count / itemsPerPage);
            });                     

            let pagesInfo = [];
            for(var i = 0; i < numOfPages; i++) {
                if(userscore > 0)
                    pagesInfo.push({route:callUrl,maxitems:itemsPerPage,offset:i*itemsPerPage, userscore });      //links url
                else
                    pagesInfo.push({route:callUrl,maxitems:itemsPerPage,offset:i*itemsPerPage});      //links url
            }
            
            callback(pagesInfo);
                                                                                        
        }, (err) => {
            
        }); 
    }        
    
    setQuestionPath(newCategory:number) : void {            
        if(!isNaN(newCategory))
            this.questionUrlPath = '/api/question/category/' + newCategory;
    }

    getImagesPath() : string {    
        return this.rootUrl + '/public/';
    }    

    getCategoryUrlPath() : string {    
        return this.rootUrl + this.categoryUrlPath;
    }    

    getRootUrl() : string {    
        return this.rootUrl;
    }

    getQuestionUrl() : string {    
        return this.rootUrl + this.questionUrlPath;
    }    

    getQuestionByIdUrlPath() : string {    
        return this.rootUrl + this.questionByIdUrlPath;
    }    

    getLoginUrl() : string {    
        return this.rootUrl + this.loginUrlPath;
    }    

    getRegisterUrl() : string {    
        return this.rootUrl + this.registerUrlPath;
    }    

    getSaveQuestionToFavPath() : string {    
        return this.rootUrl + this.SaveQuestionToFavPath;
    }    

    getSaveQuestionToBlacklistPath() : string {    
        return this.rootUrl + this.SaveQuestionToBlacklistPath;
    }    

    getFavQuestionsPath() : string {    
        return this.rootUrl + this.FavQuestionsPath;
    }    

    getDelFavQuestionsPath() : string {    
        return this.rootUrl + this.DelFavQuestionsPath;
    }

    getBlackListedQuestionsPath() : string {    
        return this.rootUrl + this.BlackListedQuestionsPath;
    }    

    getDelBlackListedQuestionsPath() : string {    
        return this.rootUrl + this.DelBlackListedQuestionsPath;
    }
    
    getQuestionsHistoryPath() : string {    
        return this.rootUrl + this.QuestionsHistoryPath;
    }

    getDelQuestionsHistoryPath() : string {    
        return this.rootUrl + this.DelQuestionsHistoryPath;
    }
    
    getQuestionUserScore() : string {    
        return this.rootUrl + this.QuestionUserScore;
    } 

    getDelQuestionUserScore() : string {    
        return this.rootUrl + this.DelQuestionUserScore;
    } 

    getQuestionSearchPath() : string {    
        return this.rootUrl + this.QuestionSearchPath;
    } 

    getSupportUrl() : string {    
        return this.rootUrl + this.SupportPath;
    }    

    getGenerateTestPath() : string {    
        return this.rootUrl + this.GenerateTestPath;
    }    

    getPaymentPath(): string {
        return this.rootUrl + this.PaymentPath;
    }

    getEnviromentS(): string {
        return this.production ? 'prod': 'dev';
    }
    
    getEnviromentB(): boolean {
        return this.production;
    }

/*
    getAddviewcountPath() : string {    
        return this.rootUrl + this.addviewcountPath;
    }    
*/
    //get element position on the screen
    getOffset( el ) {
      var _x = 0;
      var _y = 0;      
      let clientHeight = 0;
      let clientWidth  = 0;

      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {                              
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;                            
          if(clientHeight == 0) 
            clientHeight = el.clientHeight;

          if(clientWidth == 0) 
            clientWidth = el.clientWidth;

          el = el.offsetParent;
      }        
      _y += clientHeight;      
      _x += 1;      

      return { top: _y, left: _x, height:clientHeight, width: clientWidth };
  }
    
}
