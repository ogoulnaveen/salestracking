import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { Router } from '@angular/router';
import { Utility } from 'src/app/services/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';
import { CustomMisc } from 'src/app/models/utils/CustomMisc';
import { LoginService } from 'src/app/services/loginService.service';
import { PageMatrix } from 'src/app/models/utils/PageMatrix';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { CustomLogger } from 'src/app/models/utils/CustomLogger';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  email: string;
  password: string;
  lang: string = "";
  fieldTextType: boolean;
  constructor(private _dbService: DBService,
    private _router: Router,
    private util: Utility,
    private toastyService: ToastyService,
    public translate: TranslateService,
    private _loginService: LoginService) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  async login() {
    if (this.login && this.password) {
      let result = await this._dbService.getUserFromEmail(this.email).toPromise();
      if (result["data"] != null) {
        let userDetail: UserDetail = result["data"];
        this._dbService.setCurrentUserDetail(userDetail);
        //get page matrix
        let pageMatrix = new PageMatrix(userDetail.usertype_name);
        this._dbService.setPageMatrix(pageMatrix);
        this._loginService.updateAuthStatus(true);
      } else {
        CustomMisc.showAlert("Invalid Username/Password");
        return;
      }


      this._dbService.login({ email: this.email, password: this.password }).subscribe(res => {
        CustomLogger.logStringWithObject("RRR:", res);
        CustomLogger.logStringWithObject("RRR DATA:", res.data);
        if (res.data) {
          localStorage.clear();
          CustomLogger.logStringWithObject("RRR JWT:", localStorage.getItem('jwt'));
          localStorage.setItem('jwt', res.data);
          this._dbService.setToken(res.data);
          this._router.navigate(["dashboard"]);
        } else {
          let type = res.status == 200 ? 'success' : 'failed'
          this.showAlert(res.message, type);
        }
      });
    } else {
      alert("Enter email and password");
    }
    //this.showAlert("Message", "success");
  }
  onLanguageSelect(ev) {
    console.log(ev.target.value);
    //this.translate.use(ev.target.value);
    this.util.langDataSource.next(ev.target.value);
  }

  //naveen - to show alerts at completion or failure of actions
  showAlert(msg, type) {
    var toastOptions: ToastOptions = {
      title: type,
      msg: msg,
      showClose: true,
      timeout: 5000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    if (type == "success") {
      this.toastyService.success(toastOptions);
    } else if (type == "failed") {
      this.toastyService.error(toastOptions);
    } else {
      this.toastyService.warning(toastOptions);
    }
  }
  toggleFieldTextType()
  {
   this.fieldTextType = !this.fieldTextType;
 }
}
