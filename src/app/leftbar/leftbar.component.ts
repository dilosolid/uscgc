import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css']
})
export class LeftbarComponent implements OnInit {

  @Output() onRefreshQuestion = new EventEmitter();

  constructor(private _globalService: GlobalService) { }

  ngOnInit() {

  }

  changeCategory(category:number) {
    this._globalService.setQuestionPath(category);
    
    this.onRefreshQuestion.emit();       
  }

}
