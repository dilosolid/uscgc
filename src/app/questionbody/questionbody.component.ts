import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questionbody',
  templateUrl: './questionbody.component.html',
  styleUrls: ['./questionbody.component.css']
})
export class QuestionbodyComponent implements OnInit {
 
  refreshQuestion: boolean;  
  gotData  : boolean = true;
  isActive1: boolean = false;
  isActive2: boolean = false;
  isActive3: boolean = false;
  isActive4: boolean = false;
  bShowQuestionMenu: boolean = true;

  constructor(private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    
  }  

  showQuestionMenu(show){    
    this.bShowQuestionMenu = show;
  }

  onIsActive(category){           
      if(category == 1) {        
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
      }
      else if(category == 2) {        
        this.isActive1 = false;
        this.isActive2 = true;
        this.isActive3 = false;
        this.isActive4 = false;
      }
      else if(category == 3) {        
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = true;
        this.isActive4 = false;
      }
      else if(category == 4) {        
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = true;
      }
  }

  RefreshQuestion() {                
    this.gotData = false;       
  }

  gotdata(){    
    this.gotData = true;       
  }
}
