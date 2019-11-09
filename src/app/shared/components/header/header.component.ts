import {Component, Inject, OnInit} from '@angular/core';
import {APP_CONFIG} from '../../../configs/app.config';
import {ProgressBarService} from '../../services/progress-bar.service';
import {NavigationEnd, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie';
import { AuthenticationService } from 'src/app/modules/core/_services';
import { User, Role } from 'src/app/modules/core/_models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  selectedLanguage: string;
  progressBarMode: string;
  currentUrl: string;
  languages: any[];
  currentUser: User;

  constructor(@Inject(APP_CONFIG) public appConfig: any,
              private progressBarService: ProgressBarService,
              private cookieService: CookieService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.languages = [{name: 'en', label: 'English'}, {name: 'es', label: 'Español'}];
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isUser() {
    return this.currentUser;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.selectedLanguage = this.cookieService.get('language') || 'en';

    this.progressBarService.getUpdateProgressBar().subscribe((mode: string) => {
      this.progressBarMode = mode;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  changeLanguage(language: string): void {
    this.cookieService.put('language', language);
    this.selectedLanguage = language;
  }
}
