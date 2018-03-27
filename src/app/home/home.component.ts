import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  img_path_logo:  string = '';

  constructor(private _globalService: GlobalService, private router: Router) {

   }

  ngOnInit() {
    this.img_path_logo = this._globalService.getImagesPath() + 'misc/Coast_Guard_Cert_small.jpg'; 
  }

  gotoQuestions() {    
    this.router.navigateByUrl(`/question`);
  }

}
