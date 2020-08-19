import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Utility } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private util: Utility
    ) {
      this.translate.addLangs(['en', 'ar']);
      this.translate.setDefaultLang('en');
      this.util.langValue.subscribe(val =>{
        this.translate.use(val); 
      })
     }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
