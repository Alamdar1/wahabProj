import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import name from '../../package.json';
import moment from 'moment';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fans-drops-app';

  name: string;

  constructor(
    private readonly translate: TranslateService,
    private readonly modalConfig: NgbModalConfig,
    @Inject(LOCALE_ID) private readonly locale: string,
    private readonly router: Router,
    private readonly titleService: Title
  ) {
    var userLang = navigator.language; 
    console.log(userLang);
    
    if(userLang){
    this.translate.setDefaultLang(userLang);
    this.translate.use(userLang);
    }else{
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(locale);
    this.translate.use(locale);
    }
    

    moment.locale('es');

    this.modalConfig.backdrop = 'static';
  }

  ngOnInit(): void {
    this.name = "fans-drops-app";
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.titleService.setTitle(
          "FansDrop"
        );
      });
  }

  getNestedRouteTitles(): string[] {
    let currentRoute = this.router.routerState.root.firstChild;
    const titles: string[] = [];

    while (currentRoute) {
      if (currentRoute.snapshot.routeConfig.data?.title) {
        titles.push(currentRoute.snapshot.routeConfig.data.title);
      }

      currentRoute = currentRoute.firstChild;
    }

    return titles;
  }

  getLastRouteTitle(): string {
    let currentRoute = this.router.routerState.root.firstChild;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute.snapshot.data?.title;
  }

}
