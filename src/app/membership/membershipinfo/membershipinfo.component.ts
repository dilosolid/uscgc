import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-membershipinfo',
  templateUrl: './membershipinfo.component.html',
  styleUrls: ['./membershipinfo.component.css']
})
export class MembershipinfoComponent implements OnInit {

  @Input() showTitle: boolean = true;
  currentUser: any = null;	
  isPayUser: boolean = false;
  isRecurringPayUser: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();     
    this.isPayUser = this.auth.isPayUser(); 
    this.isRecurringPayUser = this.auth.isRecurringPayUser(); 
  }

  goToRegister() {    
    this.router.navigateByUrl(`/register`);
  }

  goToPayment() {
    this.router.navigateByUrl(`/payment`);
  }

}
