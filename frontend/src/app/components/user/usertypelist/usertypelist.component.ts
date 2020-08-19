import { Component, OnInit } from '@angular/core';

import { DBService } from 'src/app/services/dbservice.service';
import { UserType } from '../../../models/UserType.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomLogger } from '../../../models/utils/CustomLogger';
import { CustomMisc } from '../../../models/utils/CustomMisc';

@Component({
  selector: 'app-usertypelist',
  templateUrl: './usertypelist.component.html',
  styleUrls: ['./usertypelist.component.css']
})
export class UsertypelistComponent implements OnInit {

 

  constructor(private _dbService: DBService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  isUpdate = false;
  userType : UserType;
  filteredTableDataArr: any;
  usertypeDataArr = [];
  
 
  async init() {
    let result = await this._dbService.getAllUserType().toPromise();
    console.log("result:", result);
    this.usertypeDataArr = result["data"];
    this.filteredTableDataArr = this.usertypeDataArr;
  
  }
 async ngOnInit() {
  await this.init();}

  
  
onClickEdit(obj) {
  this._router.navigate(['/user/addusertype', obj.usertype_id]);
}
async onClickDelete(obj) {
  console.log("will delete UserType:::", obj);
 
  await this._dbService.deleteUserType(obj).toPromise();
  await this.init();} 



search(term: string) {
  let fieldName = "usertype_name";
  this.filteredTableDataArr = this.usertypeDataArr.filter(x =>
    x[fieldName].trim().toLowerCase().includes(term.trim().toLowerCase())
  );
}
}