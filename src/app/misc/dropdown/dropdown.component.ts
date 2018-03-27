import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() links: any = {};
  @Input() title: string = '';
  showDropDown:   boolean = false;
  buttonY:        number = 0;
  buttonX:        number = 0;
  elementWidth:   number = 0;

  constructor(private _globalService: GlobalService) {

   }

  ngOnInit() {

  }

  setQuestionPath(category){
    this._globalService.setQuestionPath(category);
  }
  
  ShowDropdown(event, _showDropDown, isbutton) {    
    if(isbutton) {
      let obj = this._globalService.getOffset(event.target);
      this.buttonY = obj.top;
      this.buttonX = obj.left;      
      this.elementWidth = obj.width
    }
    this.showDropDown = _showDropDown;
  }

  

}
