import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http,Response } from '@angular/http';
import { GlobalService } from '../../global.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagesInfo = [];
  currentPage:      number = 0;
  currentUserScore: number = 0;
  currentMaxItems:  number = 0;
  currentOffset:    number = 0;  
  currentRoute:     string = '';
  searchTerm:       string = '';
  gotData:          boolean = false;
  sub: object       = {};
  
  constructor(private _globalService: GlobalService, private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    
          
    for (let obj of this.pagesInfo) {      
      this.currentUserScore = obj.userscore;
      this.currentMaxItems  = obj.maxitems;
      this.currentOffset    = obj.offset;
      this.currentRoute     = obj.route;   
      this.searchTerm       = obj.searchTerm ? encodeURI(obj.searchTerm) : '';

      this.gotData = true;
      break;               
    }        

    this.sub = this.route.queryParams.subscribe(params => {                
        this.currentOffset = +params['offset']   || 0;        
    });      
  }

  Next() {    
    this.currentPage++;
    let localOffSet = this.currentOffset + this.currentMaxItems;

    if(this.currentUserScore){
      this.router.navigate([this.currentRoute], { queryParams:{ maxitems:this.currentMaxItems,offset:localOffSet, userscore:this.currentUserScore }});
    }      
    else{
      if(this.searchTerm)
        this.router.navigate([this.currentRoute], { queryParams:{ term:this.searchTerm, maxitems:this.currentMaxItems,offset:localOffSet }});
      else
        this.router.navigate([this.currentRoute], { queryParams:{ maxitems:this.currentMaxItems,offset:localOffSet }});
    }

    this.currentOffset = localOffSet;
  }

  Prev() {
    this.currentPage--;
    let localOffSet = this.currentOffset - this.currentMaxItems;    

    if(this.currentUserScore){
      this.router.navigate([this.currentRoute], { queryParams:{ maxitems:this.currentMaxItems,offset:localOffSet, userscore:this.currentUserScore }});
    }
    else{
      if(this.searchTerm)
        this.router.navigate([this.currentRoute], { queryParams:{ term:this.searchTerm, maxitems:this.currentMaxItems,offset:localOffSet }});
      else
        this.router.navigate([this.currentRoute], { queryParams:{ maxitems:this.currentMaxItems,offset:localOffSet }});
    }

    this.currentOffset = localOffSet;
  }

}
