import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }  from '@angular/router';
import { NgModule, APP_INITIALIZER  }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { GlobalService }     from './global.service';
import { AppComponent }      from './app.component';
import { QuestionComponent } from './question/question.component';
import { LeftbarComponent }  from './leftbar/leftbar.component';
import { LoginComponent }    from './membership/login/login.component';
import { RegisterComponent } from './membership/register/register.component';
import { QuestionbodyComponent } from './questionbody/questionbody.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { NavadminbarComponent } from './nav/navadminbar/navadminbar.component';
import { MembershipinfoComponent } from './membership/membershipinfo/membershipinfo.component';
import { FavoritesquestionComponent } from './membership/favoritesquestion/favoritesquestion.component';
import { BlacklistedquestionComponent } from './membership/blacklistedquestion/blacklistedquestion.component';
import { PaginationComponent } from './misc/pagination/pagination.component';
import { QuestionhistoryComponent } from './membership/questionhistory/questionhistory.component';
import { UserscorehistoryComponent } from './membership/userscorehistory/userscorehistory.component';
import { QuestionsearchComponent } from './membership/questionsearch/questionsearch.component';
import { DropdownComponent } from './misc/dropdown/dropdown.component';
import { NavquestionsComponent } from './nav/navquestions/navquestions.component';
import { SupportComponent } from './misc/support/support.component';
import { ContactComponent } from './misc/contact/contact.component';
//import { UserinfoComponent } from './misc/userinfo/userinfo.component';
import { TestgeneratorComponent } from './testgenerator/testgenerator.component';
import { FooterComponent } from './nav/footer/footer.component';
import { DisclaimerComponent } from './misc/disclaimer/disclaimer.component';
import { HomeComponent } from './home/home.component';
import { NavbarmobileComponent } from './nav/navbarmobile/navbarmobile.component';
import { NavbardesktopComponent } from './nav/navbardesktop/navbardesktop.component';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { NavquestionsmobileComponent } from './nav/navquestionsmobile/navquestionsmobile.component'
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { PayUserGuard } from './guards/payuserguard/pay-user.guard';
import { IsregisteruserGuard } from './guards/registeruserguard/isregisteruser.guard';
import { EmailVerificationComponent } from './misc/email-verification/email-verification.component';
import { PasswordRecoveryComponent } from './misc/password-recovery/password-recovery.component';
import { UserInfoComponent } from './membership/user-info/user-info.component';
import { Login3rdpartyComponent } from './membership/login3rdparty/login3rdparty.component';
import { LogoutComponent } from './membership/logout/logout.component';
import { LoadingSpinnerComponent } from './misc/loading-spinner/loading-spinner.component';
import { PaymentComponent } from './membership/payment/payment.component';


//(authService: AuthService) => function() {return authService.load()}
export function authService(authService: AuthService)  {  
  return () => {
    return authService.load();
  } 
}


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    LeftbarComponent,
    LoginComponent,
    RegisterComponent,
    QuestionbodyComponent,
    NavbarComponent,
    NavadminbarComponent,
    MembershipinfoComponent,
    FavoritesquestionComponent,
    BlacklistedquestionComponent,
    PaginationComponent,
    QuestionhistoryComponent,
    UserscorehistoryComponent,
    QuestionsearchComponent,
    DropdownComponent,
    NavquestionsComponent,
    SupportComponent,
    ContactComponent,    
    TestgeneratorComponent,
    FooterComponent,
    DisclaimerComponent,
    HomeComponent,
    NavbarmobileComponent,
    NavbardesktopComponent,
    NavquestionsmobileComponent,
    EmailVerificationComponent,
    PasswordRecoveryComponent,
    UserInfoComponent,
    Login3rdpartyComponent,
    LogoutComponent,
    LoadingSpinnerComponent,
    PaymentComponent    
  ],
  imports: [
    BrowserModule,
    Angular2FontawesomeModule,
    FormsModule,
    HttpModule,    
    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ]),
    AngularFireModule.initializeApp(environment.firebase,'uscgcert'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,    
    RouterModule.forRoot([
      { path: ''                    , component: HomeComponent},
      { path: 'login'               , component: LoginComponent },
      { path: 'register'            , component: RegisterComponent },
      { path: 'question'            , component: QuestionbodyComponent},      
      { path: 'engine2014'          , component: MembershipinfoComponent },
      { path: 'favoritesquestion'   , component: FavoritesquestionComponent,   canActivate: [PayUserGuard]},
      { path: 'blacklistedquestion' , component: BlacklistedquestionComponent, canActivate: [PayUserGuard]},
      { path: 'questionhistory'     , component: QuestionhistoryComponent,     canActivate: [PayUserGuard]},
      { path: 'userscorehistory'    , component: UserscorehistoryComponent,    canActivate: [PayUserGuard]},
      { path: 'questionsearch'      , component: QuestionsearchComponent,      canActivate: [PayUserGuard]},
      { path: 'support'             , component: SupportComponent },
      { path: 'contact'             , component: ContactComponent },
      { path: 'userinfo'            , component: UserInfoComponent},
      { path: 'testgenerator'       , component: TestgeneratorComponent,       canActivate: [PayUserGuard]},
      { path: 'membershipinfo'      , component: MembershipinfoComponent },
      { path: 'disclaimer'          , component: DisclaimerComponent },
      { path: 'recoverpassword'     , component: PasswordRecoveryComponent },
      { path: 'logout'              , component: LogoutComponent },
      { path: 'payment'             , component: PaymentComponent, canActivate: [IsregisteruserGuard]}
    ])    
  ],
  providers: [GlobalService, AuthService, PayUserGuard, IsregisteruserGuard,{ provide: APP_INITIALIZER, 
                                                                              useFactory: authService, 
                                                                              deps: [AuthService], 
                                                                              multi: true }], 
  bootstrap: [AppComponent]
}) 
export class AppModule { }
