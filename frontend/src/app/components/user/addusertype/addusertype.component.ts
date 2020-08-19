import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import { UserType} from '../../../models/UserType.model';

@Component({
  selector: 'app-addusertype',
  templateUrl: './addusertype.component.html',
  styleUrls: ['./addusertype.component.css']
})
export class AddusertypeComponent implements OnInit {

 
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  userType : UserType;
  filteredTableDataArr: any;
  usertypeDataArr = [];
  

  async ngOnInit() {
  
    this.userType = new UserType();

    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let usertype_id = params["id"];
        if (usertype_id) {
          let result = await this._dbService.getUserType(usertype_id).toPromise();
          console.log(result);
          this.userType = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
  CustomLogger.logStringWithObject("Will save usertypes...", this.userType);
try {
    let result = null;
    if (this.isUpdate)
    result = await this._dbService.updateUserType(this.userType).toPromise();
else
result = await this._dbService.addUserType(this.userType).toPromise();

CustomLogger.logStringWithObject("userType:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("userType Added Successfully");
else
    CustomMisc.showAlert("userType Updated Successfully");
this._router.navigate(["user/usertypelist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in addCategory : " + error.message, true);
}    
}
}
