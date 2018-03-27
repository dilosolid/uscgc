import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  currentUser: any = null;
  @Input() showTitle: boolean = true;
  bShowLogOut: boolean = false;

  constructor(private router: Router, private auth: AuthService, private angulartics2: Angulartics2) { 

  }

  ngOnInit() {
    this.auth.getAuthState().subscribe((user) => {
      this.currentUser = user;      
    });
  }

  showLogOut(){
    this.bShowLogOut = true;
  }

  logOut(){
    this.auth.logOutUser().then(() => {
      //console.log('Log Out');
      this.angulartics2.eventTrack.next({ action: 'LogOut User Email:' + this.currentUser.email, properties: { category: 'LogOut', label: 'LogOut' }});
      this.router.navigateByUrl(`/membershipinfo`);      
    }).catch(() =>
    {
      
    });
  }
}
