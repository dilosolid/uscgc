import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navquestionsmobile',
  templateUrl: './navquestionsmobile.component.html',
  styleUrls: ['./navquestionsmobile.component.css']
})
export class NavquestionsmobileComponent implements OnInit {

  deck:       boolean = false;
  deck2014:   boolean = false;
  engine:     boolean = false;
  engine2014: boolean = false;

  @Output() onRefreshQuestion = new EventEmitter();
  @Input() isActive1: boolean;
  @Input() isActive2: boolean;
  @Input() isActive3: boolean;
  @Input() isActive4: boolean;

  constructor() { }

  ngOnInit() {    
  }

  ShowMenu(id){    
    if(id == 1){
      this.deck       = this.deck ? false : true;        
      this.deck2014   = false;
      this.engine     = false;
      this.engine2014 = false;
    }
    else if(id == 2){
      this.deck       = false;
      this.deck2014   = this.deck2014 ? false : true;                    
      this.engine     = false;
      this.engine2014 = false;
    }
    else if(id == 3){
      this.deck       = false;
      this.deck2014   = false;      
      this.engine       = this.engine ? false : true;        
      this.engine2014 = false;
    }
    else if(id == 4){
      this.deck       = false;
      this.deck2014   = false;
      this.engine     = false;
      this.engine2014 = this.engine2014 ? false : true;              
    }

  }
 
  HideMenu() {
    this.onRefreshQuestion.emit();  
    this.deck       = false;
    this.deck2014   = false;
    this.engine     = false;
    this.engine2014 = false;
  }
}
