import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { CategoryDetail } from '../../../models/CategoryDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';

@Component({
  selector: 'app-categoryadd',
  templateUrl: './categoryadd.component.html',
  styleUrls: ['./categoryadd.component.css']
})
export class CategoryaddComponent implements OnInit {


  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  categoryDetail : CategoryDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  

  async ngOnInit() {
  
    this.categoryDetail = new CategoryDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let category_id = params["id"];
        if (category_id) {
          let result = await this._dbService.getCategory(category_id).toPromise();
          console.log(result);
          this.categoryDetail = result["data"];
          this.isUpdate = true;
        }
       
      }
    );
  
    
  }
 
   
async onSubmit() {
  CustomLogger.logStringWithObject("Will save product...", this.categoryDetail);
try {
    let result = null;
    if (this.isUpdate)
    result = await this._dbService.updateCategory(this.categoryDetail).toPromise();
else
result = await this._dbService.addCategory(this.categoryDetail).toPromise();

CustomLogger.logStringWithObject("addCategory:result:", result);
if (!this.isUpdate)
    CustomMisc.showAlert("addCategory Added Successfully");
else
    CustomMisc.showAlert("addCategory Updated Successfully");
this._router.navigate(["products/categorylist"]);

} 
catch (error) { 
CustomLogger.logError(error);
CustomMisc.showAlert("Error in addCategory : " + error.message, true);
}    }

onClickForm() {
  this.categoryDetail.category_name = "";
  
}
}
