import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { ProductDetail } from '../../../models/ProductDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

 

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  productDetail : ProductDetail;
  productDataArr1 = [];
  filteredTableDataArray: any;
  async init() {
    let result = await this._dbService.getAllProducts().toPromise();
    console.log("result:", result);
    this.productDataArr1 = result["data"];
    this.filteredTableDataArray = this.productDataArr1;

  }

  async ngOnInit() {
  
    this.productDetail = new ProductDetail();

    this._activatedRoute.params.subscribe(
      async params => {
        console.log("params:", params);
        let product_id = params["id"];
        if (product_id) {
          let result = await this._dbService.getProduct(product_id).toPromise();
          console.log(result);
          this.productDetail = result["data"];
          this.isUpdate = true;
        }
       
       

      }
    );
    
  }
 
  
async onSubmit() {
    CustomLogger.logStringWithObject("Will save product...", this.productDetail);
try {
      let result = null;
      if (this.isUpdate)
      result = await this._dbService.updateProduct(this.productDetail).toPromise();
  else
  result = await this._dbService.addProduct(this.productDetail).toPromise();

  CustomLogger.logStringWithObject("addProduct:result:", result);
  if (!this.isUpdate)
      CustomMisc.showAlert("Product Added Successfully");
  else
      CustomMisc.showAlert("Product Updated Successfully");
  this._router.navigate(["category/categorylist"]);

} 
catch (error) { 
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Product: " + error.message, true);
}    

  }

  
  onClickEdit(obj) {
    this._router.navigate(['category/categorylist', obj.product_id]);
  }

  async onClickDelete(obj) {
    console.log("will delete Category:::", obj);
    await this.init();
    await this._dbService.deleteProduct(obj).toPromise();

  }


}
