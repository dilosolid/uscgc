import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarmobile',
  templateUrl: './navbarmobile.component.html',
  styleUrls: ['./navbarmobile.component.css']
})
export class NavbarmobileComponent implements OnInit {  
  showMenu: boolean = false;
  @Input() currentUser: any;

  
  constructor(private router: Router) { }

  goToRoute(route: string) {
    if(!this.currentUser.isAnonymous)
      this.router.navigate(['/' + route], { queryParams: { } });
    else
      this.router.navigate(['/login'], { queryParams: { } });
  }

  ngOnInit() {

  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  ShowMenu() {
    this.showMenu = true;
  }

  HideMenu(extra: string) {
    this.showMenu = false;    

    if(extra == 'LogOut') 
      this.goToRoute('logout');    
  }
}
