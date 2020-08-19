import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail } from 'src/app/models/ProductDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent  implements OnInit {

  productDetail : ProductDetail;
  categoryDetail: CategoryDetail[] = [];
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;

  async htmlInit() {
    
    let result = await this._dbService.getAllCategory().toPromise();
    this.categoryDetail = result["data"];
} 
catch (error) {
    CustomLogger.logStringWithObject("ERROR:", error);
}


  ngOnInit() {
    this.productDetail = new ProductDetail();
    this.htmlInit();
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
  this._router.navigate(["products/productlist"]);

} 
catch (error) { 
  CustomLogger.logError(error);
  CustomMisc.showAlert("Error in adding Product: " + error.message, true);
}    

  }
  onClickForm() {
    this.productDetail.product_name = "";
    this.productDetail.category_name = "";
    this.productDetail.cost = "";
    this.productDetail.supplier_name = "";
    
 }
}


 /*  ngOnInit() {

    console.log("11111111111");
    this.productDetail = new ProductDetail();

  }

  async onClickSave(){
    console.log("Will save user...", this.productDetail);
    let result = await this._dbService.addProduct(this.productDetail).toPromise();
   
    console.log("Result:", result);
  }}
 */