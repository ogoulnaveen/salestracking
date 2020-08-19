import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { CategoryDetail } from '../../../models/CategoryDetail.model';
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
  categoryDetail : CategoryDetail;
  filteredTableDataArr: any;
  categoryDataArr = [];
  
 
  ALL_DELETE_ALLOWED = true;
  CAN_ADD = true;
  SHOW_ICONS = true;
  SHOW_EDIT_DELETE = true;

  async init() {
    this.ALL_DELETE_ALLOWED = this._dbService.getPageMatrix().all_delete_permissions;
    if (this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_SALES ||
      this._dbService.getCurrentUserDetail().usertype_name == CustomMisc.USER_TYPE_CUSTOMERS){
        this.SHOW_ICONS = false;
        this.SHOW_EDIT_DELETE = false;
      }

    if (!this._dbService.getPageMatrix().show_field_menu_link_categoryadd)
      this.CAN_ADD = false;
    let result = await this._dbService.getAllCategory().toPromise();
    console.log("result:", result);
    this.categoryDataArr = result["data"];
    this.filteredTableDataArr = this.categoryDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['/products/categoryadd',obj.category_id]);
}


async onClickDelete(obj) {
  console.log("will delete Category:::", obj);
 
  await this._dbService.deleteCategory(obj).toPromise();
  await this.init();} 

  search(term: string) {
    let fieldName = "category_name";
    this.filteredTableDataArr = this.categoryDataArr.filter(x =>
      x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
    );
  }
  }