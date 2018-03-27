import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navadminbar',
  templateUrl: './navadminbar.component.html',
  styleUrls: ['./navadminbar.component.css']
})
export class NavadminbarComponent implements OnInit {

  currentUser: any = null;	
  isPayUser: boolean = false;

  constructor(private auth: AuthService) { 

  }

  ngOnInit() {    
    this.currentUser = this.auth.getCurrentUser();     
    this.isPayUser = this.auth.isPayUser();             

    this.auth.getIsPayUser().subscribe((isPayUser: boolean) => {           
      this.currentUser = this.auth.getCurrentUser();     
      this.isPayUser = isPayUser;                   
    });    	   
  }  
}
