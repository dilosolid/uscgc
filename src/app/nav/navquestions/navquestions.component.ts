import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navquestions',
  templateUrl: './navquestions.component.html',
  styleUrls: ['./navquestions.component.css']
})
export class NavquestionsComponent implements OnInit {

  @Output() onRefreshQuestion = new EventEmitter();
  @Input() isActive1: boolean;
  @Input() isActive2: boolean;
  @Input() isActive3: boolean;
  @Input() isActive4: boolean;

  linksDeck:       any = {};
  linksDeck2014:   any = {};
  linksENGINE:     any = {};
  linksENGINE2014: any = {};

  links: any = {};
  showDropDown:   boolean = false;
  buttonY:        number = 0;
  buttonX:        number = 0;
  elementWidth:   number = 0;
  
 
  constructor(private _globalService: GlobalService, private route: ActivatedRoute, private router: Router) {

   }

  ngOnInit() {

    let CategoryUrlPath = this._globalService.getCategoryUrlPath();

    this.linksDeck = [{name:'RULES OF THE ROAD'  , category:'1', subCategory:'1'},
                      {name:'DECK GENERAL'       , category:'1', subCategory:'2'},
                      {name:'GENERAL NAVIGATION' , category:'1', subCategory:'3'},
                      {name:'SAFETY'             , category:'1', subCategory:'4'},
                      {name:'NAVIGATION PROBLEMS', category:'1', subCategory:'5'},
                      {name:'GMDSS ELEMENT 3'    , category:'1', subCategory:'6'},
                      {name:'GMDSS ELEMENT 7'    , category:'1', subCategory:'7'}];

    this.linksDeck2014 = [{name:'RULES OF THE ROAD'  , category:'2', subCategory:'8'},
                          {name:'DECK GENERAL'       , category:'2', subCategory:'9'},
                          {name:'GENERAL NAVIGATION' , category:'2', subCategory:'10'},                          
                          {name:'NAVIGATION PROBLEMS', category:'2', subCategory:'11'},
                          {name:'SAFETY'             , category:'2', subCategory:'12'}];
                          
    
    this.linksENGINE = [{name:'ELECTRICITY'                       , category:'3', subCategory:'13'},
                        {name:'GENERAL SUBJECTS'                  , category:'3', subCategory:'14'},
                        {name:'MOTOR PLANTS AND AUXILIARY BOILERS', category:'3', subCategory:'15'},
                        {name:'STEAM PLANTS'                      , category:'3', subCategory:'16'},
                        {name:'ENGINEERING SAFETY'                , category:'3', subCategory:'17'},
                        {name:'REFRIGERATION'                     , category:'3', subCategory:'18'},
                        {name:'GAS TURBINES'                      , category:'3', subCategory:'19'}];

    this.linksENGINE2014 = [{name:'ELECTRICITY'                       , category:'4', subCategory:'21'},
                            {name:'GENERAL SUBJECTS'                  , category:'4', subCategory:'20'},
                            {name:'MOTOR PLANTS AND AUXILIARY BOILERS', category:'4', subCategory:'23'},
                            {name:'STEAM PLANTS'                      , category:'4', subCategory:'22'},
                            {name:'ENGINEERING SAFETY'                , category:'4', subCategory:'24'}];
  }

  changeCategory(e, category, subCategory) {    
    this.onRefreshQuestion.emit();  
    e.preventDefault();
    this._globalService.setQuestionPath(subCategory);            
    this.router.navigate(['/question'], { queryParams: { category: subCategory } });
  }

  ShowDropdown(event, _showDropDown, isbutton, link, leave) {    
      
    if(link == 1) {
      this.links = this.linksDeck;        
    }
    else if(link == 2) {
      this.links = this.linksDeck2014;        
    }
    else if(link == 3) {
      this.links = this.linksENGINE;        
    }
    else if(link == 4) {
      this.links = this.linksENGINE2014;       
    }
   
    if(isbutton) {        
      let obj = this._globalService.getOffset(event.target);
      this.buttonY = obj.top;
      this.buttonX = obj.left;      
      this.elementWidth = 250;
    }
    this.showDropDown = _showDropDown;
  }

}
