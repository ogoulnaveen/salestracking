import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import {VendorDetail } from 'src/app/models/VendorDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';

@Component({
  selector: 'app-createquotation',
  templateUrl: './createvendor.component.html',
  styleUrls: ['./createvendor.component.css']
})
export class CreatevendorComponent implements OnInit {

  vendorDetail : VendorDetail;
  
  constructor(private _dbService:DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  
  isUpdate = false;
  
  ngOnInit() {
  /*   console.log("11111111111");
 */
    this.vendorDetail = new VendorDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let customer_id = params["id"];
        if (customer_id) {
          let result = await this._dbService.getVendors(customer_id).toPromise();
          console.log(result);
          this.vendorDetail = result["data"];
          this.isUpdate = true;
        }

      }
    ); 
  }

  async onSubmit() {
    CustomLogger.logStringWithObject("Will save Vendor...", this.vendorDetail);
try {
      let result = null;
      if (this.isUpdate)
      result = await this._dbService.updateVendor(this.vendorDetail).toPromise();
  else
  result = await this._dbService.addVendor(this.vendorDetail).toPromise();

  CustomLogger.logStringWithObject("addVendor:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Customer Added Successfully");
  else
      CustomMisc.showAlert("Customer Updated Successfully");
  this._router.navigate(["vendors/vendorlist"]);

} 
catch (error) {
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Customer: " + error.message, true);
}    

  }
  onClickForm() {
    this.vendorDetail.customer_name = "";
    this.vendorDetail.email = "";
    this.vendorDetail.address = "";
    this.vendorDetail.first_name = "";
    this.vendorDetail.last_name = ""; 
    this.vendorDetail.phone = "";
}


}
