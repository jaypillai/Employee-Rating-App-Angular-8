import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilsHelperService} from './shared/services/utils-helper.service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {RoutesConfig} from './configs/routes.config';
import { AuthenticationService } from './modules/core/_services';
import { User, Role } from './modules/core/_models';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  isOnline: boolean;
  currentUser: User;

  constructor(private title: Title,
              private meta: Meta,
              private snackBar: MatSnackBar,
              private router: Router,
              private i18n: I18n,
              private renderer: Renderer2,
              private authenticationService: AuthenticationService,
              @Inject(DOCUMENT) doc: Document,
              @Inject(LOCALE_ID) locale: string,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline = navigator.onLine;
      renderer.setAttribute(doc.documentElement, 'lang', locale);
    } else {
      this.isOnline = true;
    }
  }

  ngOnInit() {
    this.title.setTitle(this.i18n({value: 'App title', id: '@@appTitle'}));
    this.checkBrowser();
  }

  get isUser() {
    return this.currentUser;
  }

  checkBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      if (UtilsHelperService.isBrowserValid()) {
        this.checkBrowserFeatures();
      } else {
        this.snackBar.open(this.i18n({value: 'Change your browser', id: '@@changeBrowser'}), 'OK');
      }
    }
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.snackBar.open(this.i18n({value: 'Update your browser', id: '@@updateBrowser'}), 'OK');
    }

    return supported;
  }
}
