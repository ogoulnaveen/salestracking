import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Utility } from '../services/utility.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { CustomLogger } from '../models/utils/CustomLogger';
import { DBService } from '../services/dbservice.service';
import { CustomMisc } from '../models/utils/CustomMisc';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private util: Utility, private _dbService: DBService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    CustomLogger.logString("inside canActivate");
    if (!this.util.isAuthenticated()) {
      this.router.navigate(['auth/login']);
      return false;
    }

    if (this._dbService.getCurrentUserDetail() != null) {
      CustomLogger.logStringWithObject("next::", next);
      // let menuPathName = next.data.menuPathName;
      // let isAuthorized = CustomMisc.isPageVisible(next, this._dbService.getCurrentUserDetail().usertypename);
      // if (!isAuthorized) {
      //   console.log("This user is not authorized to view this page.....");
      //   CustomMisc.showAlert("You are not authorized to view this page.", true);
      //   return false;
      // }
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }
}