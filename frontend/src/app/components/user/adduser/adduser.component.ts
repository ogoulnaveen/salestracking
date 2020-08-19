import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { UserDetail } from 'src/app/models/UserDetail.model';
import { Router, ActivatedRoute } from '@angular/router';

import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import { UserType } from 'src/app/models/UserType.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userDetail: UserDetail;
  userType: UserType[] = [];
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  isUpdate = false;
  fieldTextType: boolean;





  async htmlInit() {
    
    let result = await this._dbService.getAllUserType().toPromise();
    this.userType = result["data"];
} 
catch (error) {
    CustomLogger.logStringWithObject("ERROR:", error);
}
  ngOnInit() {
    this.userDetail = new UserDetail();
    this.htmlInit();
    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let user_id = params["id"];
        if (user_id) {
          let result = await this._dbService.getUser(user_id).toPromise();
          console.log(result);
          this.userDetail = result["data"];
          this.isUpdate = true;
        }

      }
    );

  }



  async onSubmit() {
    CustomLogger.logStringWithObject("Will save user...", this.userDetail);
try {
      let result = null;
      if (this.isUpdate)
      result = await this._dbService.updateUser(this.userDetail).toPromise();
  else
  result = await this._dbService.addUser(this.userDetail).toPromise();

  CustomLogger.logStringWithObject("addUser:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("User Added Successfully");
  else
      CustomMisc.showAlert("User Updated Successfully");
  this._router.navigate(["user/userlist"]);

} 
catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Duplicate username/Email not allowed:" );
}    

  }
  toggleFieldTextType()
 {
  this.fieldTextType = !this.fieldTextType;
}
onClickForm() {
  this.userDetail.email = "";
  this.userDetail.first_name = "";
  this.userDetail.last_name = "";
  this.userDetail.password = "";
  this.userDetail.phone = "";
  this.userDetail.username = "";
  this.userDetail.usertype_name = "";
}
}
