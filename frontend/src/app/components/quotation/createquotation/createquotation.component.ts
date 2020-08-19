import { Component, OnInit } from '@angular/core';
import { DBService } from 'src/app/services/dbservice.service';
import { QuoteDetail } from 'src/app/models/QuoteDetail.model';
import { CategoryDetail } from 'src/app/models/CategoryDetail.model';
import { ProductDetail} from 'src/app/models/ProductDetail.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';
import {MatFormFieldControl} from '@angular/material/form-field';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-createquotation',
  templateUrl: './createquotation.component.html',
  styleUrls: ['./createquotation.component.css'],
  //providers: [{provide: MatFormFieldControl, useExisting: MyTelInput}],
})
export class CreatequotationComponent implements OnInit {

  userControl = new FormControl();
  quoteDetail: QuoteDetail;
  categoryDetail: CategoryDetail[] = [];
  productDetail : ProductDetail[] =[]
  products;
  product_name;
  unitCost;
  product_keyword = 'product_name';
  customer_keyword = "customer_name";
  customer_name:string;
  customers;
  isUpdate: boolean = false;

  selectedProducts = new Array<any>();
  filteredProducts: Observable<any>;
  lastFilter: string = '';
  total_cost = 0;
  quantity = 1;
  discount = 0;
  displayValue: string;
  
  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  updateFlag = false;
  async htmlInit() {
     let result = await this._dbService.getAllCategory().toPromise();
   
    this.categoryDetail = result["data"]; 
   
  }
  catch(error) {
    CustomLogger.logStringWithObject("ERROR:", error);
  }
 
  async ngOnInit() {
    this.updateFlag = this.isUpdate;
    this.quoteDetail = new QuoteDetail();
    this.htmlInit();
    let productResult = await this._dbService.getAllProducts().toPromise();
    this.products = productResult["data"];
    //add properties to the product object, needs to be created a model for mapping
    this.products.forEach(element => {
      element.selected = false;
      element.quantity = 1;
      element.discount = 0;
    });
    // in case of update get the id of quota
    this._activatedRoute.params.subscribe(
      async params => {
        let quote_id = params["id"];
        if (quote_id) {
          let result = await this._dbService.getQuote(quote_id).toPromise();
          this.isUpdate = true;
          this.quoteDetail = result["data"];
          this.total_cost = this.quoteDetail.total_cost;
          this.quoteDetail.vendor_id;

          // set the saved values of products name in multiselect
          this.quoteDetail.product_name.forEach(element => {
            this.products.forEach(el => {
              if(el.product_name == element.product_name){
                el.quantity = element.quantity;
                el.discount = element.discount;
                el.product_Total = element.product_Total;
                this.toggleSelection(el);
              }
            });
          });
        }
      }
    );
    this._dbService.getAllVendors().subscribe(res =>{
      if(res)
      this.customers = res.data;
    });

    //on search in product name, filter the result
    this.filteredProducts = this.userControl.valueChanges.pipe(
      startWith<string | any>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  async onSubmit() {
    CustomLogger.logStringWithObject("Will save user...", this.quoteDetail);
    try {
      let result = null;
      if (this.isUpdate) {
        this.quoteDetail.product_name = this.selectedProducts;
        this.quoteDetail.total_cost = this.total_cost;
        result = await this._dbService.updateQuote(this.quoteDetail).toPromise();
      }
      else {
        this.quoteDetail.product_name = this.selectedProducts;
        this.quoteDetail.total_cost = this.total_cost;
        result = await this._dbService.addQuote(this.quoteDetail).toPromise();
      }
      CustomLogger.logStringWithObject("addQuotation:result:", result);
      if (!this.isUpdate) {
        CustomMisc.showAlert("Quotation Added Successfully");

      }
      else {
        CustomMisc.showAlert("Quotation Updated Successfully");

      }
      this._router.navigate(["quotation/quotationlist"]);

    }
    catch (error) {
      CustomLogger.logError(error);
      CustomMisc.showAlert("Error in adding Qotation: " + error.message, true);
    }

  }
  // set the mobile and customer name on select of customer
  onCustomerSelect(customer){
  /*  this.quoteDetail.phone = customer.phone; */
  this.quoteDetail = customer;
    this.customer_name = customer.customer_name;
    this.quoteDetail.vendor_id = customer.vendor_id;
    
  }
  onChangeSearch(ev) {

  }
  onFocused(ev) {

  }

  filter(filter: string): any {
    this.lastFilter = filter;
    if (filter) {
      return this.products.filter(option => {
        return option.product_name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
         
      })
    } else {
      return this.products.slice();
    }
  }
  //bind the selected value of dropdown, and show the selected text of productname
  displayFn(value: any | string): string | undefined {
    if (Array.isArray(value)) {
      value.forEach((product, index) => {
        if (index === 0) {
          this.displayValue = product.product_name;
        } else {
          this.displayValue += ', ' + product.product_name;
        }
      });
    } else {
      this.displayValue = value;
    }
    return  this.displayValue;
  }

  optionClicked(event: Event, product: any) {
    event.stopPropagation();
    this.toggleSelection(product);
  }

  //toggle checkbox and selections of product
  toggleSelection(product: any) {
    product.selected = !product.selected;
    if (product.selected) {
      if(!this.isUpdate){
        product.product_Total = product.cost;
        
      }
      this.selectedProducts.push(product);
    } else {
      const i = this.selectedProducts.findIndex(value => (value.product_name === product.product_name));
      this.selectedProducts.splice(i, 1);
    }

    this.userControl.setValue(this.selectedProducts);
    this.total_cost =this.gettotal_cost();
  }

  //on change of product quantity, update corresponding values
  onChangeProductQnt(index, ev){
    this.selectedProducts[index].quantity = ev.target.value;
    this.selectedProducts[index].product_Total = (this.selectedProducts[index].cost * ev.target.value)-(this.selectedProducts[index].cost * ev.target.value * this.selectedProducts[index].discount/100);
    this.total_cost =  this.gettotal_cost();
  }

  //on change of product discount, update corresponding values
  onChangeProductDiscount(index, ev){
    this.selectedProducts[index].discount = ev.target.value;
    let total = this.selectedProducts[index].cost * this.selectedProducts[index].quantity;
    this.selectedProducts[index].product_Total = total -total * ev.target.value/100;
    this.total_cost =this.gettotal_cost();
  }

  //get the total cost based on quantity and discounts of all added products
  gettotal_cost() {
    return this.selectedProducts.reduce((a, b) => a + (b['product_Total'] || 0), 0);
  }
  
  exportToPrint()  
    {  
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        var position = 0; 
       
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('Quotationlist.pdf'); // Generated PDF   
      });  
    } 
    onClickForm() {
    /*   this.quoteDetail.customer_name = "";
      this.quoteDetail.mobile = ""; */
      this.quoteDetail.quotation_date = "";
      this.quoteDetail.product_name = "";
     
  }
}




