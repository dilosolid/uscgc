import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { GlobalService } from '../../global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-navbardesktop',
  templateUrl: './navbardesktop.component.html',
  styleUrls: ['./navbardesktop.component.css']
})
export class NavbardesktopComponent implements OnInit {  
  
  @Input() currentUser: any;
  img_path_logo:  string = '';

  constructor(private _globalService: GlobalService, private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 
    
  }

  goToRoute(route: string) {
    if(!this.currentUser.isAnonymous)
      this.router.navigate(['/' + route], { queryParams: { } });
    else
      this.router.navigate(['/login'], { queryParams: { } });
  }

  ngOnInit() {
    this.img_path_logo = this._globalService.getImagesPath() + 'misc/Coast_Guard_Cert_small.jpg'; 
  }

 logout() {    
    this.goToRoute('logout');    
  }

}
