import { Component,OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  

  constructor(private auth: AuthService, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { 
    
  }

  ngOnInit() {            
        
  }


}
